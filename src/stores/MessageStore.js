
///<reference path="../utils/ChatMessageUtil.js" />
///<reference path="ThreadStore.js" />

import Events from 'events';
import ThreadStore from '../stores/ThreadStore';
import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher.js';
import ChatConstants from '../constants/ChatConstants';
import ChatMessageUtils from '../utils/ChatMessageUtil';

const ActionTypes = ChatConstants.ActionTypes;
const CHANGE_EVENT = 'change';        

class MessageStore extends Events.EventEmitter {
    messages = {};
    dispatchToken = null;

    addMessages(rawMessages) {
        rawMessages.forEach(message => {
            if(!this.messages[message.id]) {
                this.messages[message.id] = ChatMessageUtils.convertRawMessage(
                    message,
                    ThreadStore.getCurrentID()
                );
            }
        });
    }
    
    markAllInThreadRead(threadID) {
        for(var id in this.messages) {
            if(this.messages[id].threadID == threadID) {
                this.messages[id].isRead = true;
            }
        } 
    }
    // Tell react view to update DOM/HTML
    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener (callback){
        this.removeListener(CHANGE_EVENT, callback);
    }

    get(id) {
        return this.messages[id];
    }

    getAll(){
        return this.messages;
    }

    getAllForThread(threadID) {
        var threadMessages = [];
        for (var id in this.messages) {
            if(this.messages[id].threadID === threadID) {
                threadMessages.push(this.messages[id]);
            }
        }

        threadMessages.sort((a,b) => {
            if(a.date < b.date) {
                return -1;
            }
            else if (a.date > b.date) {
                return 1;
            }

            return 0;
        });

        return threadMessages;
    }

    getAllForCurrentThread = () => {
        return this.getAllForThread(ThreadStore.getCurrentID());
    }
}

var messageStoreInstance = new MessageStore();

messageStoreInstance.dispatchToken = ChatAppDispatcher.register((action) => {
    switch(action.type) {
        case ActionTypes.CLICK_THREAD:
            ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
            messageStoreInstance.markAllInThreadRead(ThreadStore.getCurrentID());
            messageStoreInstance.emitChange();
            break;
        case ActionTypes.CREATE_MESSAGE:
            var message = ChatMessageUtils.getCreatedMessageData(
                action.text,
                action.currentThreadID
            );

            messageStoreInstance.messages[message.id] = message;
            messageStoreInstance.emitChange();
            break;
        case ActionTypes.RECEIVE_RAW_MESSAGES:
            messageStoreInstance.addMessages(action.rawMessages);
            ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
            messageStoreInstance.markAllInThreadRead(ThreadStore.getCurrentID());
            messageStoreInstance.emitChange();
            break;
        default:
            // do nothing 
    }
});

export default messageStoreInstance;