import React, { Component } from "react";
import "./App.scss";
import Messages from "./Components/Messages/Messages";
import Input from "./Components/Input/Input";
import { randomName, randomColor } from "./Helper";
import picture from "./talk.png";

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
    },
  };

  componentDidMount() {
    this.drone = new window.Scaledrone("0BlFx30DzdfwUzxS", {
      data: this.state.member,
    });

    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });

    const room = this.drone.subscribe("observable-room");

    room.on("message", (message) => {
      const { data, member, timestamp } = message;
      const messages = this.state.messages;
      const time = new Date(timestamp * 1000).toLocaleTimeString("hr-HR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      messages.push({ member, time, text: data });
      this.setState({ messages });
    });
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message,
    });
  };

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <img
            src={picture}
            alt="logo"
            width="100px"
            height="100px"
            className="picture"
          ></img>
          <h1 className="title">MyChat</h1>
        </div>
        <hr className="underline" />
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }
}

export default App;
