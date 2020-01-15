import ChatConstants from '../constants/ChatConstants';
var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher.js');
var ActionTypes = ChatConstants.ActionTypes;

class ChatServerActionCreator {
        receiveAll(rawMessages) {
        ChatAppDispatcher.dispatch({
            type: ActionTypes.RECEIVE_RAW_MESSAGES,
            rawMessages: rawMessages
        });
    }

    receiveCreatedMessage(createdMessage) {
        ChatAppDispatcher.dispatch({
            type: ActionTypes.RECEIVE_RAW_CREATED_MESSAGE,
            rawMessage: createdMessage
        });
    }
}

var chatServerActionCreatorInstance = new ChatServerActionCreator();

export default chatServerActionCreatorInstance;