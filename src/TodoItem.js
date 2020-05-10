import React, { Component } from "react";
import classNames from "classnames";
import "./TodoItem.css";
import checkImg from "./img/check.png";
import checkCompleteImg from "./img/check-complete.png";
import deleteImg from "./img/clear1.png";

class TodoItem extends Component {
  render() {
    const { item, onClick, itemDelete } = this.props;
    let url = checkImg;
    if (item.isComplete) {
      url = checkCompleteImg;
    }
    return (
      <div
        className={classNames("TodoItem", {
          "TodoItem-complete": item.isComplete
        })}
      >
        <img onClick={onClick} src={url} alt="" width="32" height="32" />
        <p>{item.title}</p>
        <img
          className="delete-button"
          onClick={itemDelete}
          src={deleteImg}
          alt=""
          width="20"
          height="20"
        />
      </div>
    );
  }
}

export default TodoItem;
