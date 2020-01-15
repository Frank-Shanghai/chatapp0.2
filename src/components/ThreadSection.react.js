import React from 'react';
import ThreadListItem from '../components/ThreadListItem.react';
import ThreadStore from '../stores/ThreadStore';
import UnreadThreadStore from '../stores/UnreadThreadStore';

class ThreadSection extends React.Component{

    constructor(props){
        super(props);        
        this.state = this.getStateFromStores();
    }

    getStateFromStores = () => {
        return {
            threads: ThreadStore.getAllChrono(),
            currentThreadID: ThreadStore.getCurrentID(),
            unreadCount: UnreadThreadStore.getCount()
        };
    }    

    _onChange  = () => {
        this.setState(this.getStateFromStores());
    }

    componentDidMount(){
        ThreadStore.addChangeListener(this._onChange);
        UnreadThreadStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        ThreadStore.removeChangeListener(this._onChange);
        UnreadThreadStore.removeChangeListener(this._onChange);
    }

    render() {
        var threadListItems = this.state.threads.map((thread) => {
            return (
                // Here use the thread id as the list item key
                <ThreadListItem
                    key={thread.id}
                    thread={thread}
                    currentThreadID={this.state.currentThreadID}
                ></ThreadListItem>
            );
        }, this);

        var unread = this.state.unreadCount == 0 ? null : <span>Unread threads: {this.state.unreadCount}</span>;

        return (
            <div className="thread-section">
                <div className="thread-count">
                    {unread}
                </div>
                <ul className="thread-list">
                    {threadListItems}
                </ul>
            </div>
        );
    }
}

export default ThreadSection;