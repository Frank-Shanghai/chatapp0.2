import React from 'react';
import ChatThreadActionCreators from '../actions/ChatThreadActionCreator';

// A helper to apply css class dynamically
import cx from 'react-cx';

class ThreadListItem extends React.Component {

    constructor(props) {
        super(props);
    }
        
    render(){
        var thread = this.props.thread;
        var lastMessage = thread.lastMessage;

        return (
            <li className={cx({
                'thread-list-item': true,
                'active': thread.id == this.props.currentThreadID
            })}
            onClick={this._onClick}>
                <h5 className="thread-name">{thread.name}</h5>
                <div className="thread-time">
                    {lastMessage.date.toLocaleTimeString()}
                </div>
                <div className="thread-last-message">
                    {lastMessage.text}
                </div>
            </li>
        );
    }

    _onClick = ()=>{
        ChatThreadActionCreators.clickThread(this.props.thread.id);
    }
}

export default ThreadListItem;
