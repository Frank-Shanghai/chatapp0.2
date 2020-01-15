import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher.js';
import ChatConstants from '../constants/ChatConstants';

var ActionTypes = ChatConstants.ActionTypes;

export default {
    clickThread: (threadID) => {
        ChatAppDispatcher.dispatch({
            type: ActionTypes.CLICK_THREAD,
            threadID: threadID
        });
    }
};