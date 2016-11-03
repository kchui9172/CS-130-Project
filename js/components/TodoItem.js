import React from 'react';
import ReactDOM from 'react-dom';

export default class ToDoItem extends React.Component {
  constructor(props) {
    super(props);

    //this.removeNode = this.removeNode.bind(this);
  };

  /*removeNode(key){
    e.preventDefault();
    this.props.removeNode(key);
  }*/

  render(){
    var todoEntries = this.props.entries;
    function createTasks(item){
      return (
        <li key={item.key}>
            {item.text}
            <div className="poster">
                {item.user} - {item.time}
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
