import {CodyResponse, CodyResponseType, Node, RawNodeRecordProps} from "@proophboard/cody-types";
import {CodyConfig} from "../config/codyconfig";

export interface ElementEdited {
    node: RawNodeRecordProps;
    context: {boardId: string, boardName: string, userId: string};
}

export const handleElementEdited = async (node: Node, codyConfig: CodyConfig): Promise<CodyResponse> => {
    const hookName = 'on' + node.getType().charAt(0).toUpperCase() + node.getType().slice(1);

    if(codyConfig.hooks.hasOwnProperty(hookName)) {
        const hook = codyConfig.hooks[hookName];
        return await hook(node, codyConfig.context);
    } else {
        return {
            cody: [`%cI'm skipping "${node.getName()}". It's a ${node.getType()}, but I cannot find a hook for it.`, 'color: #fb9f4b; font-weight: bold'],
            details: [`%cIf you want me to handle ${node.getName()}, add a %c${hookName}%c hook to codyconfig.js`, 'color: #414141', 'background-color: rgba(251, 159, 75, 0.2)', 'color: #414141'],
            type: CodyResponseType.Info
        }
    }
}
