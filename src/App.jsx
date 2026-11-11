import React, { Component } from 'react';
import './index.css';

class App extends Component {
  //  states in constructor are created here
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { id: 1, text: 'IAmHere', completed: false },
        { id: 2, text: 'reactjsexample.com', completed: false },
        { id: 3, text: 'A To do app developed using to consolidate your knowledge about React', completed: false }
      ],
      inputValue: '',
      editingId: null,
      editingText: ''
    };
  }

  //   localStorage Load saved todos on mount & save on update
  componentDidMount() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        this.setState({ todos: JSON.parse(savedTodos) });
      } catch (error) {
        console.error('Failed to parse todos from localStorage', error);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  //  implement Input Tracking Handler
  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  //  Implement Task Creation Handler (handleAddTodo)
  handleAddTodo = (e) => {
    e.preventDefault();
    const trimmed = this.state.inputValue.trim();
    if (!trimmed) return;

    const newTodo = {
      id: Date.now(),
      text: trimmed,
      completed: false
    };

    this.setState((prevState) => ({
      todos: [...prevState.todos, newTodo],
      inputValue: ''
    }));
  };

  // Completion Toggle Handler (Checkbox line-through cancel toggle)
  handleToggleComplete = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  };

  //  Task Deletion Handler (handleDeleteTodo)
  handleDeleteTodo = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== id)
    }));
  };

  // Inline Editing Handlers (Double-click to edit, save, cancel)
  handleStartEdit = (todo) => {
    this.setState({
      editingId: todo.id,
      editingText: todo.text
    });
  };

  handleEditTextChange = (e) => {
    this.setState({ editingText: e.target.value });
  };

  handleSaveEdit = (id) => {
    const trimmed = this.state.editingText.trim();
    if (!trimmed) return;

    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, text: trimmed } : todo
      ),
      editingId: null,
      editingText: ''
    }));
  };

  handleCancelEdit = () => {
    this.setState({
      editingId: null,
      editingText: ''
    });
  };

  render() {
    const { todos, inputValue, editingId, editingText } = this.state;

    return (
      <div className="todo-app-wrapper">
        {/*  Construct Render Layout & Faded Minimalist Title */}
        <h1 className="main-title">todos</h1>

        <div className="todo-container">
          {/*Build Input Form Bar & Circular Add Button */}
          <form onSubmit={this.handleAddTodo} className="todo-form">
            <input
              type="text"
              value={inputValue}
              onChange={this.handleInputChange}
              placeholder="Add todo..."
              className="todo-input-field"
            />
            <button type="submit" className="add-btn-circle" title="Add todo">
              +
            </button>
          </form>

          {/* Task List with Checkbox Cancellation & Icon Actions */}
          {todos.length === 0 ? (
            <div className="todo-empty-state">No tasks yet. Add one above!</div>
          ) : (
            <ul className="todo-list-container">
              {todos.map((todo) => {
                const isEditing = editingId === todo.id;
                return (
                  <li key={todo.id} className="todo-list-item">
                    {isEditing ? (
                      <div className="edit-row-box">
                        <input
                          type="text"
                          value={editingText}
                          onChange={this.handleEditTextChange}
                          className="edit-input-field"
                          autoFocus
                        />
                        {/* Icon-based Save & Cancel Actions */}
                        <button onClick={() => this.handleSaveEdit(todo.id)} className="btn-icon-action save" title="Save">
                          💾
                        </button>
                        <button onClick={this.handleCancelEdit} className="btn-icon-action cancel" title="Cancel">
                          ❌
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="task-content-group">
                          {/* Checkbox controls  cancellation */}
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => this.handleToggleComplete(todo.id)}
                            className="task-checkbox"
                          />
                          {/* Double-click text to with editing */}
                          <span 
                            className={`task-text-label ${todo.completed ? 'completed' : ''}`}
                            onDoubleClick={() => this.handleStartEdit(todo)}
                            title="Double-click to edit task"
                          >
                            {todo.text}
                          </span>
                        </div>
                        <div className="task-action-group">
                          {/* Icon-based Delete Action */}
                          <button 
                            onClick={() => this.handleDeleteTodo(todo.id)} 
                            className="btn-delete-trash"
                            title="Delete task"
                          >
                            🗑️
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default App;