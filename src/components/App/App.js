import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import StudentForm from '../StudentForm/StudentForm';

class App extends Component {
  constructor(props) {
    super(props);
    // Keep track of the student list
    this.state = {
      studentList: [],
      info:{},
    };

    // Give our function access to `this`
    this.addStudent = this.addStudent.bind(this);
  }
  componentDidMount() {
    console.log('App component mounted');
    this.getStudent()

    
  }
  
getStudent(){
axios.get('/students')
.then((response)=> {
  this.setState({studentList:[...response.data]});
  
console.log('getStudent',response.data);
}).catch((error)=> {
  console.log('in getStudent', error);
})
}


getInfo(userName) {

axios.get(`https://api.github.com/users/${userName}?access_token=913f20e25e454b699cbf7b4d5f3ae7fd516cafc4
  `)

  .then((response)=>{
    this.setState({info:{...response.data}});
  
      console.log('Username',response);
    }).catch((error)=>{
      console.log(error);
    });
  }
  // This function is called by the StudentForm when the submit button is pressed
  handleSubmit(event) {
    event.preventDefault();
    this.state.addStudent(this.state);
    this.clearStudentFields();
}
  
 
  addStudent(newStudent) {
    console.log(newStudent);
    axios.post('/students',newStudent)
    .then((response)=>{
      console.log('response from post',response.config.data);
      this.getStudent(response)
      
    })
    
    // POST your data here
  }
gitDelete(student){
  console.log(student);
  axios.delete(`/students/${student}`, {data: {id: student }})

  .then((response)=> {
console.log('response', response);
this.getStudent();

  }).catch((error)=>{
    console.log(error);
    
  });
}


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">GitHub Student List</h1>
        </header>
        <br/>
        <StudentForm addStudent={this.addStudent}/>
        
        
        
        <div>
        <table>
        <thead>
          <tr>
            <th>Student List</th>
          <th>Info Getter</th>
         
          </tr>
        </thead>
        <tbody>{
          this.state.studentList.map(student =>
          <tr key={student._id}>
          <td>{student.github} 
          </td>
        
          <td><button onClick={(event) => this.getInfo(student.github, event)}>More Details</button></td>
          
          <td><button onClick={(event) => this.gitDelete(student._id, event)}>Delete</button></td>
          </tr>
          )}
          </tbody>
      </table>
      </div>
      <div className="card">
      
          <img  src={this.state.info.avatar_url} alt="yourFace"/>
          
      <ul>
        <li>{this.state.info.bio}</li>
      </ul>
      </div>
      
      </div>
      
 
    );
  }
}

export default App;
