import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Represents a To-Do Item.
 *
 * @class React.Component.TodoItem
 * @extends React.Component
 */
export default class TodoItem extends React.Component {
    /**
     * Constructs a To-Do Item.
     *
     * @method constructor
     * @constructor
     * @param {Object} props - Properties passed by parent
     */
    constructor(props) {
        super(props);
    };

    /**
     * Renders a To-Do Item.
     *
     * @method render
     */
    render() {
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
