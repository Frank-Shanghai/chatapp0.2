import React from 'react';
import ThreadSection from './ThreadSection.react.js';
import MessageSection from './MessageSection.react';

// Apply css styling stuff through this way
import '../App.css';

class ChatApp extends React.Component {
    render(){
        return (
            <div className="chatapp">
                <ThreadSection />
                <MessageSection />
            </div>
        );
    }
}

export default ChatApp;
