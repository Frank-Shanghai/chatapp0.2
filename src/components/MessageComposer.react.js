import ChatMessageActionCreator from '../actions/ChatMessageActionCreator';
import React from 'react';

class MessageComposer extends React.Component {
    ENTER_KEY_CODE = 13;

    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    render() {
        return (
            <textarea
            className="message-composer"
            name="message"
            value={this.state.text}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            ></textarea>
        );
    }

    onChange = (event, value) => {
        this.setState({text: event.target.value});
    };

    onKeyDown = (event) => {
        if(event.keyCode == this.ENTER_KEY_CODE) {
            event.preventDefault();
            var text = this.state.text.trim();

            if(text) {
                ChatMessageActionCreator.createMessage(text, this.props.threadID);
            }

            this.setState({text: ''});
        }
    };
}

export default MessageComposer;