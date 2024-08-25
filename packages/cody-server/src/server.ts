import compression from 'compression';
import cors from 'cors';
import {Request, Response} from "express";
import express from 'express';
import { Server } from 'http';
import http from 'http';
import {Map} from "immutable";
import {CodyResponse, CodyResponseType, makeNodeRecord, Node} from "@proophboard/cody-types";
import {greeting, IioSaidHello} from "./http/greeting";
import {checkQuestion, handleReply, Reply, test} from "./http/question";
import {CodyConfig, Sync} from "./config/codyconfig";
import {ElementEdited, handleElementEdited} from "./http/elementEdited";

const syncStatus = {syncRequired: true};

const codyServer = (codyConfig: CodyConfig): Server => {

    const app = express();

    const options: cors.CorsOptions = {
        allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'X-Access-Token',
            'Authorization'
        ],
        credentials: true,
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        origin: '*',
        preflightContinue: false,
    };

    // GZIP compress resources served
    app.use(compression());
    app.use(cors(options));
    app.use(express.json({limit: "100mb"}));

    // Force redirect to HTTPS if the protocol was HTTP
    // if (!process.env.LOCAL) {
    //     app.use( enforce.HTTPS( { trustProtoHeader: true } ) );
    // }

    const server = http.createServer(app);

    enum Events {
        IioSaidHello= 'IioSaidHello',
        UserReplied = 'UserReplied',
        ElementEdited = 'ElementEdited',
        ConfirmTest = 'ConfirmTest',
    }

    enum Commands {
        Sync= 'Sync',
        SyncDeleted= 'SyncDeleted'
    }

    app.post(`/messages/${Events.IioSaidHello}`, (req: Request<any, CodyResponse, IioSaidHello>, res: Response<CodyResponse>) => {
        console.log(Events.IioSaidHello);

        syncStatus.syncRequired = true;

        res.send(greeting(req.body.user))
    });

    app.post(`/messages/${Events.UserReplied}`, (req: Request<any, CodyResponse, Reply>, res: Response<CodyResponse>) => {
        console.log(Events.UserReplied, req.body);

        handleReply(req.body.reply).then(codyRes => {
            res.send(checkQuestion(codyRes));
        }, reason => {
            res.send({
                cody: "Look's like something went wrong!",
                details: reason.toString(),
                type: CodyResponseType.Error
            });
        });
    });

    app.post(`/messages/${Events.ElementEdited}`, (req: Request<any, CodyResponse, ElementEdited>, res: Response<CodyResponse>) => {
        console.log(Events.ElementEdited, req.body);

        const reqContext = req.body.context;
        codyConfig.context = {
            ...codyConfig.context,
            ...reqContext,
        };

        if(syncStatus.syncRequired) {
            codyConfig.context.syncedNodes = Map<string, Node>();

            res.send({
                cody: 'I need to sync all elements first.',
                details: "Lean back for a moment. I'll let you know when I'm done.",
                type: CodyResponseType.SyncRequired
            })
            return;
        }

        handleElementEdited(makeNodeRecord(req.body.node), codyConfig).then(codyRes => {
            res.send(checkQuestion(codyRes));
        }, reason => {
            console.log(reason);
            res.send({
                cody: `Uh, sorry. Cannot handle element ${makeNodeRecord(req.body.node).getName()}!`,
                details: reason.toString(),
                type: CodyResponseType.Error
            });
        });
    });

    app.post(`/messages/${Commands.Sync}`, (req: Request<any, CodyResponse, Sync>, res: Response<CodyResponse>) => {
        console.log(Commands.Sync, "full sync");

        syncStatus.syncRequired = false;

        let nodes: Node[] = [];

        if(req.body.nodes && Array.isArray(req.body.nodes)) {
            nodes = req.body.nodes.map(makeNodeRecord);
        } else {
            res.send({
                cody: 'No nodes given in sync request!',
                type: CodyResponseType.Error
            })
            return;
        }

        nodes.forEach(node => {
            console.log("synced node: ", node.getName());
            codyConfig.context.syncedNodes = codyConfig.context.syncedNodes.set(node.getId(), node);
        })

        res.send({
            cody: '',
            type: CodyResponseType.Empty
        });
    });

    app.put(`/messages/${Commands.Sync}`, (req: Request<any, CodyResponse, Sync>, res: Response<CodyResponse>) => {
        console.log(Commands.Sync, "edit sync");

        if(syncStatus.syncRequired) {
            // Seems like server lost in-memory sync due to restart but InspectIO continues to send sync requests
            // Ignore sync until user triggers next code generation and therefore next full sync
            console.log("sync ignored");
            res.send({
                cody: '',
                type: CodyResponseType.Empty
            });
            return;
        }

        let nodes: Node[] = [];

        if(req.body.nodes && Array.isArray(req.body.nodes)) {
            nodes = req.body.nodes.map(makeNodeRecord);
        } else {
            res.send({
                cody: 'No nodes given in sync request!',
                type: CodyResponseType.Error
            })
            return;
        }

        nodes.forEach(node => {
            console.log("synced node: ", node.getName(), `(${node.getId()} - ${node.getType()})`, "parent: ", node.getParent()? node.getParent()!.getId() : '-');
            codyConfig.context.syncedNodes = codyConfig.context.syncedNodes.set(node.getId(), node);
        })

        res.send({
            cody: '',
            type: CodyResponseType.Empty
        });
    });

    app.post(`/messages/${Commands.SyncDeleted}`, (req: Request<any, CodyResponse, Sync>, res: Response<CodyResponse>) => {
        console.log(Commands.SyncDeleted);

        if(syncStatus.syncRequired) {
            // Seems like server lost in-memory sync due to restart but InspectIO continues to sent sync requests
            // Ignore sync until user triggers next code generation and therefor next full sync
            console.log("sync ignored");
            res.send({
                cody: '',
                type: CodyResponseType.Empty
            });
            return;
        }

        let nodes: Node[] = [];

        if(req.body.nodes && Array.isArray(req.body.nodes)) {
            nodes = req.body.nodes.map(makeNodeRecord);
        } else {
            res.send({
                cody: 'No nodes given in sync request!',
                type: CodyResponseType.Error
            })
            return;
        }

        nodes.forEach(node => {
            console.log("synced node: ", node.getName(), `(${node.getId()} - ${node.getType()})`, "parent: ", node.getParent()? node.getParent()!.getId() : '-');
            codyConfig.context.syncedNodes = codyConfig.context.syncedNodes.delete(node.getId());
        })

        res.send({
            cody: '',
            type: CodyResponseType.Empty
        });
    });

    app.post(`/messages/${Events.ConfirmTest}`, (req: Request<any, CodyResponse, any>, res: Response<CodyResponse>) => {
        console.log(Events.ConfirmTest);

        res.send(checkQuestion(test()));
    });

    return server;
}

export default codyServer;
