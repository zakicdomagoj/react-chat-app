import { Component } from "react";
import React from "react";
import "./Messages.scss";
import ScrollableFeed from "react-scrollable-feed";

class Messages extends Component {
  render() {
    const { messages } = this.props;
    return (
      <ScrollableFeed>
        <ul className="messages-list">
          {messages.map((message, index) => this.renderMessage(message, index))}
        </ul>
      </ScrollableFeed>
    );
  }
  renderMessage(message, index) {
    const { member, text, time } = message;
    const { currentMember } = this.props;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe ? "messages currentMember" : "messages";
    return (
      <li key={index} className={className}>
        <div className="message-text">
          <div className="username">{member.clientData.username}</div>
          <div
            className="text"
            style={{ backgroundColor: member.clientData.color }}
          >
            {text}
          </div>
          <div className="time">{time}</div>
        </div>
      </li>
    );
  }
}

export default Messages;
