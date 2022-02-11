"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const immutable_1 = require("immutable");
const cody_types_1 = require("@proophboard/cody-types");
const greeting_1 = require("./http/greeting");
const question_1 = require("./http/question");
const elementEdited_1 = require("./http/elementEdited");
// tslint:disable-next-line:no-var-requires
const bodyParser = require('body-parser');
const syncStatus = { syncRequired: true };
const codyServer = (codyConfig) => {
    const app = express_1.default();
    const options = {
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
    app.use(compression_1.default());
    app.use(cors_1.default(options));
    app.use(bodyParser.json());
    // Force redirect to HTTPS if the protocol was HTTP
    // if (!process.env.LOCAL) {
    //     app.use( enforce.HTTPS( { trustProtoHeader: true } ) );
    // }
    const server = http_1.default.createServer(app);
    let Events;
    (function (Events) {
        Events["IioSaidHello"] = "IioSaidHello";
        Events["UserReplied"] = "UserReplied";
        Events["ElementEdited"] = "ElementEdited";
        Events["ConfirmTest"] = "ConfirmTest";
    })(Events || (Events = {}));
    let Commands;
    (function (Commands) {
        Commands["Sync"] = "Sync";
        Commands["SyncDeleted"] = "SyncDeleted";
    })(Commands || (Commands = {}));
    app.post(`/messages/${Events.IioSaidHello}`, (req, res) => {
        console.log(Events.IioSaidHello);
        syncStatus.syncRequired = true;
        res.send(greeting_1.greeting(req.body.user));
    });
    app.post(`/messages/${Events.UserReplied}`, (req, res) => {
        console.log(Events.UserReplied, req.body);
        question_1.handleReply(req.body.reply).then(codyRes => {
            res.send(question_1.checkQuestion(codyRes));
        }, reason => {
            res.send({
                cody: "Look's like something went wrong!",
                details: reason.toString(),
                type: cody_types_1.CodyResponseType.Error
            });
        });
    });
    app.post(`/messages/${Events.ElementEdited}`, (req, res) => {
        console.log(Events.ElementEdited, req.body);
        if (syncStatus.syncRequired) {
            codyConfig.context.syncedNodes = immutable_1.Map();
            res.send({
                cody: 'I need to sync all elements first.',
                details: "Lean back for a moment. I'll let you know when I'm done.",
                type: cody_types_1.CodyResponseType.SyncRequired
            });
            return;
        }
        elementEdited_1.handleElementEdited(cody_types_1.makeNodeRecord(req.body.node), codyConfig).then(codyRes => {
            res.send(question_1.checkQuestion(codyRes));
        }, reason => {
            console.log(reason);
            res.send({
                cody: `Uh, sorry. Cannot handle element ${cody_types_1.makeNodeRecord(req.body.node).getName()}!`,
                details: reason.toString(),
                type: cody_types_1.CodyResponseType.Error
            });
        });
    });
    app.post(`/messages/${Commands.Sync}`, (req, res) => {
        console.log(Commands.Sync, "full sync");
        syncStatus.syncRequired = false;
        let nodes = [];
        if (req.body.nodes && Array.isArray(req.body.nodes)) {
            nodes = req.body.nodes.map(cody_types_1.makeNodeRecord);
        }
        else {
            res.send({
                cody: 'No nodes given in sync request!',
                type: cody_types_1.CodyResponseType.Error
            });
            return;
        }
        nodes.forEach(node => {
            console.log("synced node: ", node.getName());
            codyConfig.context.syncedNodes = codyConfig.context.syncedNodes.set(node.getId(), node);
        });
        res.send({
            cody: '',
            type: cody_types_1.CodyResponseType.Empty
        });
    });
    app.put(`/messages/${Commands.Sync}`, (req, res) => {
        console.log(Commands.Sync, "edit sync");
        if (syncStatus.syncRequired) {
            // Seems like server lost in-memory sync due to restart but InspectIO continues to send sync requests
            // Ignore sync until user triggers next code generation and therefore next full sync
            console.log("sync ignored");
            res.send({
                cody: '',
                type: cody_types_1.CodyResponseType.Empty
            });
            return;
        }
        let nodes = [];
        if (req.body.nodes && Array.isArray(req.body.nodes)) {
            nodes = req.body.nodes.map(cody_types_1.makeNodeRecord);
        }
        else {
            res.send({
                cody: 'No nodes given in sync request!',
                type: cody_types_1.CodyResponseType.Error
            });
            return;
        }
        nodes.forEach(node => {
            console.log("synced node: ", node.getName(), `(${node.getId()} - ${node.getType()})`, "parent: ", node.getParent() ? node.getParent().getId() : '-');
            codyConfig.context.syncedNodes = codyConfig.context.syncedNodes.set(node.getId(), node);
        });
        res.send({
            cody: '',
            type: cody_types_1.CodyResponseType.Empty
        });
    });
    app.post(`/messages/${Commands.SyncDeleted}`, (req, res) => {
        console.log(Commands.SyncDeleted);
        if (syncStatus.syncRequired) {
            // Seems like server lost in-memory sync due to restart but InspectIO continues to sent sync requests
            // Ignore sync until user triggers next code generation and therefor next full sync
            console.log("sync ignored");
            res.send({
                cody: '',
                type: cody_types_1.CodyResponseType.Empty
            });
            return;
        }
        let nodes = [];
        if (req.body.nodes && Array.isArray(req.body.nodes)) {
            nodes = req.body.nodes.map(cody_types_1.makeNodeRecord);
        }
        else {
            res.send({
                cody: 'No nodes given in sync request!',
                type: cody_types_1.CodyResponseType.Error
            });
            return;
        }
        nodes.forEach(node => {
            console.log("synced node: ", node.getName(), `(${node.getId()} - ${node.getType()})`, "parent: ", node.getParent() ? node.getParent().getId() : '-');
            codyConfig.context.syncedNodes = codyConfig.context.syncedNodes.delete(node.getId());
        });
        res.send({
            cody: '',
            type: cody_types_1.CodyResponseType.Empty
        });
    });
    app.post(`/messages/${Events.ConfirmTest}`, (req, res) => {
        console.log(Events.ConfirmTest);
        res.send(question_1.checkQuestion(question_1.test()));
    });
    return server;
};
exports.default = codyServer;
