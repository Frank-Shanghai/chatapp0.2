import MessageComposer from './MessageComposer.react';
import MessageListItem from './MessageListItem.react';
import MessageStore from '../stores/MessageStore';
import React from 'react';
import ReactDOM from 'react-dom';
import ThreadStore from '../stores/ThreadStore';

class MessageSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getStateFromStores();
    }

    getStateFromStores() {
        return {
            messages: MessageStore.getAllForCurrentThread(),
            thread: ThreadStore.getCurrent()
        };
    }

    getMessageListItem(message) {
        return (
            <MessageListItem
            key={message.id}
            message={message}
            ></MessageListItem>
        );
    }

    render() {
        var messageListItems = this.state.messages.map(this.getMessageListItem);

        // Note the ref attribute in ul, it's related with the scrollToBottom method
        return (
            <div className="message-section">
                <h3 className="message-thread-heading">{this.state.thread.name}</h3>
                <ul className="message-list" ref="messageList">
                    {messageListItems}
                </ul>
                <MessageComposer threadID={this.state.thread.id} />
            </div>
        );
    }

    componentDidMount() {
        this.scrollToBottom();
        MessageStore.addChangeListener(this.onChange);
        ThreadStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        MessageStore.removeChangeListener(this.onChange);
        ThreadStore.removeChangeListener(this.onChange);
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        // https://segmentfault.com/q/1010000007906728?_ea=1488928   findDOMNode
        var ul = ReactDOM.findDOMNode(this.refs.messageList); // TODO, what's this?
        ul.scrollTop = ul.scrollHeight;
    }

    onChange = () => {
        this.setState(this.getStateFromStores());
    };
}

export default MessageSection;