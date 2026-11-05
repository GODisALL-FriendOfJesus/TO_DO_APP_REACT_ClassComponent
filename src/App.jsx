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
handToggleComplete= (id) =>{
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

                                    </div>
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