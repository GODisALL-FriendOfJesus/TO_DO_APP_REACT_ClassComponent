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


    render(){
        const {todos,inputValue,editingId,editingText}=this.state;
        return(
            <div>
            <div class='style.container'>
                <h1>ToDo List</h1>
                <form onSubmit={this.handleAddTodo} class='Style.form'>
<input type='text' value={inputValue} onChange={this.handleInputChange} placeholder='Add a new task ...' class='style.input'/>
                
                <button type='submit' class='style.addButton'>Add</button>
                </form>
            </div>
            </div>
        )
    }
 }
 export default App;