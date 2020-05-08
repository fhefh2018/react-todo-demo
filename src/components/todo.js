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
          <section className="main" style={{ display: `${this.state.todo.length ? 'block' : 'none'}` }}>
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
          <footer className="footer" style={{ display: `${this.state.todo.length ? 'block' : 'none'}` }}>
            <span className="todo-count">
              <strong>{this.state.todo.length}</strong> item left
            </span>
            <ul className="filters">
              <li>
                <a href="#/all" className={`${this.state.select === "ALL" ? "selected" : ""}`} onClick={this.handleSelect.bind(this, "ALL")}>All</a>
              </li>
              <li>
                <a href="#/active" className={`${this.state.select === "ACTIVE" ? "selected" : ""}`} onClick={this.handleSelect.bind(this, "ACTIVE")}>Active</a>
              </li>
              <li>
                <a href="#/completed" className={`${this.state.select === "COMPLETED" ? "selected" : ""}`} onClick={this.handleSelect.bind(this, "COMPLETED")} >Completed</a>
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
    });

    this.setState({
      todo: todo,
    });
  }

  handleClear() {
    // let todo = this.state.todo;
    // console.log("before: ", todo);

    // let result = todo.filter((value, index) => {
    //   if (1 !== value.status) {
    //     todo.splice(index, 1);
    //     return value;
    //   }
    // });

    // this.setState({
    //   todo: result,
    // });
    this.filterType("COMPLETED");
  }

  handleSelect(select) {

    this.setState({
      select
    })
    this.filterType(select);
  }

  filterType = (type) => {
    const todo = this.state.filterTodo;

    switch (type) {
      case "ALL":
        this.setState({
          todo: todo
        });
        break;
      case "ACTIVE":
        this.todoFilter(0);
        break;
      case "COMPLETED":
        this.todoFilter(1);
        break;
      default:
        this.setState({
          todo: todo
        });
    }
  }

  todoFilter = (type) => {
    const todo = this.state.todo;
    let result = [];
    todo.map((value) => {
      if (value.status === type) {
        result.push(value);
      }
    });
    return result;
  }
}
