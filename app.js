import React from 'react';
import ReactDOM from 'react-dom';
import CartItem from './js/components/cartItem.js';
import Login from './js/components/Login.js'
import MessageComponent from './js/components/MessageComponent.js'

// const order = {
//     title: 'Fresh fruits package',
//     image: 'http://images.all-free-download.com/images/graphiclarge/citrus_fruit_184416.jpg',
//     initialQty: 3,
//     price: 8
// };
//
// ReactDOM.render(
//     <CartItem title={order.title} image={order.image} initialQty={order.initialQty} price={order.price}/>,
//     document.querySelector('.root')
// );

ReactDOM.render(
    <Login/>,
    document.querySelector('.login')
);

ReactDOM.render(
    <MessageComponent/>,
    document.querySelector('.messages')
);
