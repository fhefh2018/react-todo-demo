import React from "react";

export default class Todo extends React.Component {
  constructor() {
    super();
    this.state = {
      todo: [],
      filterTodo: [],
      value: "",
      select: "ALL",
    };
  }
  render() {
    return (
      <div className="todo">
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <input
              className="new-todo"
              autoFocus
              autoComplete="off"
              placeholder="What needs to be done?"
              onChange={this.handleChange.bind(this)}
              onKeyDown={this.handleKeyDown.bind(this)}
              value={this.state.value}
            />
          </header>
          <section
            className="main"
            style={{ display: `${this.state.todo.length ? "block" : "none"}` }}
          >
            <input id="toggle-all" className="toggle-all" type="checkbox" />
            <label htmlFor="toggle-all"></label>
            <ul className="todo-list">
              {this.state.todo.map((value, index) => {
                return (
                  <li
                    className={`todo ${value.status === 1 ? "completed" : ""}`}
                    key={index}
                  >
                    <div className="view">
                      <input
                        type="checkbox"
                        className="toggle"
                        onChange={this.handleChangeStatus.bind(this, value.id)}
                        checked={value.status === 1 ? true : false}
                      />
                      <label>{value.content}</label>
                      <button
                        className="destroy"
                        onClick={this.handleRemove.bind(this, value.id)}
                      ></button>
                    </div>
                    <input type="text" className="edit" />
                  </li>
                );
              })}
            </ul>
          </section>
          <footer
            className="footer"
            style={{
              display: `${this.state.filterTodo.length ? "block" : "none"}`,
            }}
          >
            <span className="todo-count">
              <strong>{this.state.todo.length}</strong> item left
            </span>
            <ul className="filters">
              <li>
                <span
                  className={`${this.state.select === "ALL" ? "selected" : ""}`}
                  onClick={this.handleSelect.bind(this, "ALL")}
                >
                  All
                </span>
              </li>
              <li>
                <span
                  className={`${
                    this.state.select === "ACTIVE" ? "selected" : ""
                  }`}
                  onClick={this.handleSelect.bind(this, "ACTIVE")}
                >
                  Active
                </span>
              </li>
              <li>
                <span
                  href="#/completed"
                  className={`${
                    this.state.select === "COMPLETED" ? "selected" : ""
                  }`}
                  onClick={this.handleSelect.bind(this, "COMPLETED")}
                >
                  Completed
                </span>
              </li>
            </ul>
            <button
              className="clear-completed"
              onClick={this.handleClear.bind(this)}
            >
              Clear completed
            </button>
          </footer>
        </section>
      </div>
    );
  }

  handleRemove(id) {
    let todo = this.state.todo;
    todo.map((value, index) => {
      if (id === value.id) {
        todo.splice(index, 1);
      }
    });

    this.setState({
      todo: todo,
    });
  }

  handleChange(e) {
    let value = e.target.value;
    this.setState({
      value: value,
    });
  }

  handleKeyDown(e) {
    const code = e.keyCode;
    const value = e.target.value;
    const todo = this.state.todo;
    let data, newTodo;
    // status: 0 未完成， 1已经完成

    if (13 === code && value !== "") {
      data = { id: `todo${Date.now()}`, content: value, status: 0 };
      newTodo = [data, ...todo];

      this.setState({
        todo: newTodo,
        filterTodo: newTodo,
        value: "",
      });
    }
  }

  handleChangeStatus(id, e) {
    const checked = e.target.checked;
    let status = 0;
    let todo = this.state.todo;

    if (checked) {
      status = 1;
    } else {
      status = 0;
    }

    todo.map((value, index) => {
      if (value.id === id) {
        value.status = status;
      }
      return value;
    });

    this.setState({
      todo: todo,
    });
  }

  handleClear() {
    let afterClearTodo = this.state.todo.filter((value) => {
      if (value.status !== 1) {
        return value;
      }
    });

    if (afterClearTodo.length) {
      this.setState({
        todo: afterClearTodo,
        filterTodo: afterClearTodo,
      });
    }
  }

  handleSelect(select) {
    this.setState({
      select,
    });
    this.filterType(select);
  }

  filterType = (type) => {
    // const todo = this.state.todo;
    const filterTodo = this.state.filterTodo;

    switch (type) {
      case "ALL":
        this.setState({
          todo: filterTodo,
        });
        console.log("ALL: ", filterTodo);
        break;
      case "ACTIVE":
        let activeResult = this.todoFilter(0);
        this.setState({
          todo: activeResult,
        });
        console.log("ACTIVE: ", activeResult);
        break;
      case "COMPLETED":
        let completedResult = this.todoFilter(1);
        this.setState({
          todo: completedResult,
        });
        console.log("COMPLETED: ", completedResult);
        break;
      default:
        this.setState({
          todo: filterTodo,
        });
    }
  };

  todoFilter = (type) => {
    const todo = this.state.filterTodo;
    let result = todo.filter((value) => {
      if (value.status === type) {
        return value;
      }
    });
    return result;
  };
}
