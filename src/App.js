import React, { Component } from "react";
import TodoItem from "./TodoItem";
import "./TodoItem.css";
import tick from "./img/tick.png";

class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem: "",
      todoItems: [
        { title: "Buy snacks", isComplete: true },
        { title: "Go shopping" },
        { title: "Go home", isComplete: true }
      ],
      completeAlItems: "false",
      todoSaw: "all"
    };

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onAllItemsClick = this.onAllItemsClick.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.sawItem = this.sawItem.bind(this);
    this.clearCompleteItems = this.clearCompleteItems.bind(this);
  }

  onItemClicked(item) {
    return event => {
      const isComplete = item.isComplete;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete
          },
          ...todoItems.slice(index + 1)
        ]
      });
    };
  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      // Enter Key
      let text = event.target.value;
      if (!text) {
        return;
      }
      text = text.trim();
      if (!text) {
        return;
      }
      this.setState({
        newItem: "",
        todoItems: [{ title: text, isComplete: false }, ...this.state.todoItems]
      });
    }
  }

  onChange(event) {
    this.setState({
      newItem: event.target.value
    });
  }

  onAllItemsClick() {
    const { todoItems } = this.state;
    this.setState({
      todoItems: todoItems.map(item => ({
        ...item,
        isComplete: this.state.completeAlItems
      })),
      completeAlItems: !this.state.completeAlItems
    });
  }

  deleteItem(item) {
    return event => {
      const { todoItems } = this.state;
      let index = todoItems.indexOf(item);
      let deleteIndex = todoItems.splice(index, 1);
      this.setState({
        todoItems: todoItems
      });
    };
  }

  sawItem(sawType) {
    this.setState({
      todoSaw: sawType
    });
  }

  clearCompleteItems() {
    const { todoItems } = this.state;
    this.setState({
      todoItems: todoItems.filter(i => i.isComplete === false || !i.isComplete)
    });
  }

  render() {
    const { todoItems, newItem, todoSaw } = this.state;
    let todos = [];
    let a;
    if (todoSaw === "all") {
      todos = todoItems;
      a = "a";
    } else if (todoSaw === "actice") {
      todos = todoItems.filter(i => i.isComplete === false || !i.isComplete);
      a = "a";
    } else if (todoSaw === "complete") {
      todos = todoItems.filter(i => i.isComplete === true);
      a = "a";
    }
    let x = todoItems.filter(i => i.isComplete === false || !i.isComplete);
    if (todoItems.length) {
      return (
        <div className="Todo">
          <div className="Header">
            <img src={tick} alt="" onClick={this.onAllItemsClick} />
            <input
              type="text"
              value={newItem}
              onChange={this.onChange}
              placeholder="What needs to be done ?"
              onKeyUp={this.onKeyUp}
            />
          </div>
          {todos.length > 0 &&
            todos.map((item, index) => (
              <TodoItem
                key={index}
                item={item}
                onClick={this.onItemClicked(item)}
                itemDelete={this.deleteItem(item)}
              />
            ))}
          <div className="all-button">
            <p className="items-length">{x.length} Items left </p>
            <div className="on-saw-items">
              <p className={a} onClick={() => this.sawItem("all")}>
                All
              </p>
              <p className={a} onClick={() => this.sawItem("actice")}>
                Active
              </p>
              <p className={a} onClick={() => this.sawItem("complete")}>
                Completed
              </p>
            </div>
            <p className="clear-button" onClick={this.clearCompleteItems}>
              Clear Complete
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="Todo">
          <div className="Header">
            <img
              className="tick-style"
              src={tick}
              alt=""
              onClick={this.onAllItemsClick}
            />
            <input
              type="text"
              value={newItem}
              onChange={this.onChange}
              placeholder="What needs to be done ?"
              onKeyUp={this.onKeyUp}
            />
          </div>
        </div>
      );
    }
  }
}
export default App;
