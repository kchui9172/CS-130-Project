import React from 'react';
import ReactDOM from 'react-dom';

export default class ChoreComponent extends React.Component {
  constructor() {
    super();
    this.state = {value: ''};
	this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  handleSubmit(event) {
    alert('Text field value is: ' + this.state.value);
  }

  render() {
    return (
      <div>
        Chore Name:
		<input type="text" name="chore_name"
		 value={this.state.value} onChange={this.handleChange}/>
		<br/>
		Assignee:
		<input type="text" name="assignee"/>
		<br/>
		Due Date:
		<input type="text" name="due_date"/>
		<br/>
        <button onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
  

}