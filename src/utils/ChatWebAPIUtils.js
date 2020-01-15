import ChatServerActionCreators from '../actions/ChatServerActionCreator';

export default {
    getAllMessages: function(){
        // simulate retreeving data from a database
        var rawMessages = JSON.parse(window.localStorage.getItem('messages'));

        // simulate success callback
        ChatServerActionCreators.receiveAll(rawMessages);
    },

    createMessage: function(message, threadName) {
        // simulate writing to a database
        var rawMessages = JSON.parse(localStorage.getItem('messages'));
        var timestamp = Date.now();
        var id = 'm_' + timestamp;
        var threadID = message.threadID || ('t_' + Date.now());
        var createdMessage = {
            id: id,
            threadID: threadID,
            threadName: threadName,
            authorName: message.authorName,
            text: message.text,
            timestamp: timestamp
        };

        rawMessages.push(createdMessage);
        localStorage.setItem('messages', JSON.stringify(rawMessages));

        // simulate success callback
        setTimeout(function(){
            ChatServerActionCreators.receiveCreatedMessage(createdMessage);
        }, 0);
    }
};

