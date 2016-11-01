import React from 'react';
import ReactDOM from 'react-dom';


class ToDoItem extends React.Component {
  constructor(props) { 
    super(props);
      
    this.removeNode = this.removeNode.bind(this);
  };

  removeNode(key){
    e.preventDefault();
    this.props.removeNode(key);
  }

  render(){
    var todoEntries = this.props.entries;
    function createTasks(item){
      return (
        <li key={item.key}>
          {item.text}
          <div className="pull-right" role="group">
            <button type="button" className="btn btn-xs btn-danger img-circle">X</button>
          </div>
        </li> 
        );
    }
    var listItems = todoEntries.map(createTasks);

    return(
      <ul className="theList">
        {listItems}
      </ul>
    );
   }
}
export default ToDoItem;

//onClick={this.removeNode}