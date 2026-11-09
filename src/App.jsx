 import React,{Component} from 'react';
 class App extends Component{
    constructor(props){
        super(props);
        this .state={
            todos:[],
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
        console.error('Failed to parse todos from localStorage', error);
      }
    }
  }

// Change 10: Save todos to localStorage whenever state updates
  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

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
                    {todos.map((todo) => {
                        const isEditing = editingId === todo.id;
                        return(
                            <li key={todo.id} className='style.listItem'>
                                {isEditing ? (
                                    <div className='style.editRow'>
                                        <input type='text' value={editingText}
                                        onChange={this.handleEditTextChange}
                                        className='style.input'
                                        autoFocus/>

                                    </div>
                                ): (<>
                    <span
                      onClick={() => this.handleToggleComplete(todo.id)}
                      
                    >
                      {todo.text}
                    </span>
                    <div  >
                      <button
                        onClick={() => this.handleStartEdit(todo)}
                         
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => this.handleDeleteTodo(todo.id)}
                         
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}

                            </li>
                        )

                    })}

                 </ul>
            </div>
            </div>
        );
    }
 }
 export default App;