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
  // This function is called by the StudentForm when the submit button is pressed
  
  
 
  addStudent(newStudent) {
    console.log(newStudent);
    axios.post('/students',newStudent)
    .then((response)=>{
      console.log('response from post',response.config.data);
      this.getStudent(response)
      
    })
    
    // POST your data here
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
          <tr><th>Student List</th></tr>
        </thead>
        <tbody>{
          this.state.studentList.map(student =>
          <tr key={student._id}>
          <td>{student.github}</td>
          </tr>
          )}
          </tbody>
      </table>
      </div>
      </div>
      
 
    );
  }
}

export default App;
