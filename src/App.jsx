 import React,{Component} from 'react';
 class App extends Component{
    constructor(props){
        super(props);
        this .state={
            todos: [
        { id: 1, text: 'IAmHere', completed: false },
        { id: 2, text: 'reactjsexample.com', completed: false },
        { id: 3, text: 'A To do app developed using to consolidate your knowledge about React', completed: false }
      ],
            inputValue:'',
            editingId:null,
            editingText:''
        };
    }

componentDidMount() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        this.setState({ todos: JSON.parse(savedTodos) });
      } catch (error) {
        console.error('Failed to save todoLists localStorage', error);
      }
    }
  }

// Change 10: Save todos to localStorage whenever state updates
  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }
//this is tracking input changes if new characters intered in input text box
  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

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

//track changes
handleInputChange = (e) =>{
    this.setState({inputValue:e.target.value});
};
//add new item
handleAddTodo = (e) =>{
    e.preventDefault();
    const trimmed=this.state.inputValue.trim();
    if(!trimmed)return;
    const newTodo={
        id:Date.now(),
        text:trimmed,
        completed:false
    };
    this.setState((prevState) => ({
        todos: [...prevState.todos,newTodo],
        inputValue:''
    }));
};
//updates saved
handleToggleComplete= (id) =>{
    this.setState((prevState) =>({
        todos:prevState.todos.map((todo) =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo)
    }));
};
//add todo handler
  handleDeleteTodo = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== id)
    }));
  };
//Start editing handler
  handleStartEdit = (todo) => {
    this.setState({
      editingId: todo.id,
      editingText: todo.text
    });
  };
  // Track edit input changes
  handleEditTextChange = (e) => {
    this.setState({ editingText: e.target.value });
  };
  //Change 5: Save edited todo
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
  //Cancel editing mode
  handleCancelEdit = () => {
    this.setState({
      editingId: null,
      editingText: ''
    });
  };

    render(){
        const {todos,inputValue,editingId,editingText}=this.state;
        return(
            <div>
            <div className='style.container'>
                <h1>ToDo List</h1>
                <form onSubmit={this.handleAddTodo} className='Style.form'>
<input type='text' value={inputValue} onChange={this.handleInputChange} placeholder='Add a new task ...' className='style.input'/>
                
                <button type='submit' className='style.addButton'>Add</button>
                </form>
                 <ul className='style.list'>
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
                        <button onClick={() => this.handleSaveEdit(todo.id)} className="btn-save-task">Save</button>
                        <button onClick={this.handleCancelEdit} className="btn-cancel-task">Cancel</button>
                      </div>
                    ) : (
                      <>
                        <div className="task-content-group" onDoubleClick={() => this.handleStartEdit(todo)}>
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => this.handleToggleComplete(todo.id)}
                            className="task-checkbox"
                          />
                          <span className={`task-text-label ${todo.completed ? 'completed' : ''}`}>
                            {todo.text}
                          </span>
                        </div>
                        <div className="task-action-group">
                          <button 
                            onClick={() => this.handleStartEdit(todo)} 
                            className="btn-edit-task"
                            title="Edit task"
                          >
                            Edit
                          </button>
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
            </div>
            </div>
        );
    }
 }
 export default App;