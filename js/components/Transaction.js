import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Represents a Transaction.
 *
 * @class React.Component.Transaction
 * @extends React.Component
 */
export default class Transaction extends React.Component {
    /**
     * Constructs a Transaction Item.
     *
     * @method constructor
     * @constructor
     * @param {Object} props - Properties passed by parent
     */
    constructor(props) {
        super(props);
    };

    /**
     * Renders a Transaction Item.
     *
     * @method render
     */
    render() {
        var transactions = this.props.entries;
        console.log("Transactions: ",transactions);
        /*function createTasks(item){
            return (
                <li key={item.key}>
                    {item.text}
                    <div className="poster">
                        {item.user} - {item.time}
                    </div>
                </li>
            );
        }
        var listItems = todoEntries.map(createTasks);*/

        return(
            /*<ul className="theList">
                {listItems}
            </ul>*/
            <div>
            	<h1> placeholder for transactions </h1>
            </div>
        );
    }
}
