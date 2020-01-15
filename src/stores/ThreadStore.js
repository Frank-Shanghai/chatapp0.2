///<reference path="../utils/ChatMessageUtil.js" />

import Events from 'events';
import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher.js';
import ChatConstants from '../constants/ChatConstants';
import ChatMessageUtils from '../utils/ChatMessageUtil';

const ActionTypes = ChatConstants.ActionTypes;
const CHANGE_EVENT = 'change';



class ThreadStore extends Events.EventEmitter {
    currentID = null;
    threads = {};

    dispatchToken = null;
    
    init(rawMessages) {
        rawMessages.forEach(message => {
            var threadID = message.threadID;
            var thread = this.threads[threadID];
            if(thread && thread.lastTimestamp > message.timestamp) {
                return;
                // Here, is it right to use return?
                // Yes, because it's Array.forEach, it is different from the real 
                // for, it cannot be break or return, just call the callback handler 
                // for each item
            }

            this.threads[threadID] = {
                id: threadID,
                name: message.threadName,
                lastTimestamp: message.timestamp,
                lastMessage: ChatMessageUtils.convertRawMessage(message, this.currentID)
            };
        });

        if(!this.currentID){
            var allChrono = this.getAllChrono();
            this.currentID = allChrono[allChrono.length - 1].id;
        }

        this.threads[this.currentID].lastMessage.isRead = true;
    }

    // Tell react view to update DOM/HTML
    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    /**
     * @param {function} callback
     */
    addChangeListener = (callback) => {
        this.on(CHANGE_EVENT, callback);
    }

    /**
     * @param {function} callback
     */
    removeChangeListener = (callback) => {
        this.removeListener(CHANGE_EVENT, callback);
    }

    /**
     * param {string} id
     */
    get(id){
        return this.threads[id];
    }

    getAll(){
        return this.threads;
    }

    getAllChrono(){
        var orderedThreads = [];

        // go through the dictionary keys
        for(var id in this.threads){
            var thread = this.threads[id];
            orderedThreads.push(thread);
        }
        orderedThreads.sort((a, b) => {
            if(a.lastMessage.date < b.lastMessage.date) {
                return -1;
            }
            else if (a.lastMessage.date > b.lastMessage.date) {
                return 1;
            }

            return 0;
        });

        return orderedThreads;
    }

    getCurrentID(){
        return this.currentID;
    }

    getCurrent(){
        return this.get(this.getCurrentID());
    }    
}

var threadStoreInstance = new ThreadStore();

threadStoreInstance.dispatchToken = ChatAppDispatcher.register((action) => {    
    switch(action.type){
        case ActionTypes.CLICK_THREAD:
            threadStoreInstance.currentID = action.threadID;
            threadStoreInstance.threads[threadStoreInstance.currentID].lastMessage.isRead = true;
            threadStoreInstance.emitChange();
            break;
        case ActionTypes.RECEIVE_RAW_MESSAGES:
            threadStoreInstance.init(action.rawMessages);
            threadStoreInstance.emitChange();
            break;

        default:
            // do nothing                    
    }
});

export default threadStoreInstance;
