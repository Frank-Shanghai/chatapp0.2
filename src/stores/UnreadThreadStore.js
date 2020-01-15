import Events from 'events';
import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import ChatConstants from '../constants/ChatConstants';
import MessageStore from '../stores/MessageStore';
import ThreadStore from '../stores/ThreadStore';

class UnreadThreadStore extends Events.EventEmitter {
    ActionTypes = ChatConstants.ActionTypes;
    CHANGE_EVENT = 'change';
    dispatchToken = null;

    // Tell react view to update DOM/HTML
    emitChange(){
        this.emit(this.CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(this.CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(this.CHANGE_EVENT, callback);
    }

    getCount() {
        var threads = ThreadStore.getAll();
        var unreadCount = 0;
        for(var id in threads) {
            if(!threads[id].lastMessage.isRead) {
                unreadCount++;
            }
        }

        return unreadCount;
    }
}

var unreadThreadStoreInstance = new UnreadThreadStore();

unreadThreadStoreInstance.dispatchToken = ChatAppDispatcher.dispatch((action) => {
    ChatAppDispatcher.waitFor([
        ThreadStore.dispatchToken,
        MessageStore.dispatchToken
    ]);

    switch(action.type) {
        case unreadThreadStoreInstance.ActionTypes.CLICK_THREAD:
            unreadThreadStoreInstance.emitChange();
            break;

        case unreadThreadStoreInstance.ActionTypes.RECEIVE_RAW_MESSAGES:
            unreadThreadStoreInstance.emitChange();
            break;

        default:
            // do nothing
    }
});

export default unreadThreadStoreInstance;