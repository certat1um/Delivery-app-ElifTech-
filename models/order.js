const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');
const Cart = require('../models/cart');

class Order {
    static async getOrdersFile() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '../variables', 'orders.json'),
                'utf-8',
                (err, content) => {
                    if(err) reject(err)
                    else resolve(JSON.parse(content));
                }
            )
        });
    }
    static async makeOrder(userInfo) {
        const orders = await Order.getOrdersFile();
        const cart = await Cart.getCart();
    
        const newOrder = {};
        newOrder.id = uniqid();
        newOrder.order = cart[0];
        newOrder.user_info = userInfo;
    
        orders.push(newOrder);
    
        fs.writeFile(
            path.join(__dirname, '../variables', 'orders.json'),
            JSON.stringify(orders),
            (err) => {
                if(err) {
                    throw err;
                }
            }
        )
    
        await Cart.cleanCart();
    }
}

module.exports = Order;