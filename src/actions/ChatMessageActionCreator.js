import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import ChatConstants from '../constants/ChatConstants';
import ChatWebAPIUtils from '../utils/ChatWebAPIUtils';
import ChatMessageUtils from '../utils/ChatMessageUtil';

var ActionTypes = ChatConstants.ActionTypes;

export default {
    createMessage: (text, currentThreadID) => {
        ChatAppDispatcher.dispatch({
            type: ActionTypes.CREATE_MESSAGE,
            text: text,
            currentThreadID: currentThreadID
        });

        var message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID);
        ChatWebAPIUtils.createMessage(message);
    }
};