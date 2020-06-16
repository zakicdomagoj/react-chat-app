import React, { Component } from "react";
import "./Input.css";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { faLaughBeam } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Input extends Component {
  state = {
    text: "",
    showEmojiPicker: false,
  };

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ text: "" });
    this.setState({ showEmoji: false });
    this.props.onSendMessage(this.state.text);
  }
  toggleEmojiPicker = () => {
    this.setState({
      showEmojiPicker: !this.state.showEmojiPicker,
    });
  };
  addEmoji = (emoji) => {
    this.setState({
      text: this.state.text + emoji.native,
    });
  };
  render() {
    return (
      <div className="input">
        <form onSubmit={(e) => this.onSubmit(e)}>
          <input
            onChange={(e) => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Type your message..."
          />
          <button
            type="button"
            className="toggle-emoji"
            onClick={this.toggleEmojiPicker}
          >
            <FontAwesomeIcon icon={faLaughBeam} />
          </button>
          <button className="button-send">Send</button>
        </form>
        {this.state.showEmojiPicker ? (
          <Picker set="apple" onSelect={this.addEmoji} className="emoji-mart" />
        ) : null}
      </div>
    );
  }
}

export default Input;
