"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
module.exports = {
    context: {
        /*
         * The context object is passed to each hook as second argument
         * use it to pass configuration to your hooks like a src directory, credentials, ...
         */
        // This Cody server implements the optional Sync flow and stores all synced nodes in this context property
        syncedNodes: (0, immutable_1.Map)({}),
        // Following properties are populated on every trigger
        boardId: '',
        boardName: '',
        userId: '',
        userName: ''
    },
    hooks: {
    /**
     * Uncomment and implement a hook to activate it
     */
    // onAggregate: onAggregateHook,
    // onBoundedContext: onBoundedContextHook,
    // onCommand: onCommandHook,
    // onDocument: onDocumentHook,
    // onEvent: onEventHook,
    // onFeature: onFeatureHook,
    // onFreeText: onFreeTextHook,
    // onExternalSystem: onExternalSystemHook,
    // onIcon: onIconHook,
    // onImage: onImageHook,
    // onHotSpot: onHotSpotHook,
    // onLayer: onLayerHook,
    // onPolicy: onPolicyHook,
    // onRole: onRoleHook,
    // onUi: onUiHook,
    }
};
