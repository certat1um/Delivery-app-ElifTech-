const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

class Cart {
    static async getCart() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '../variables', 'cart.json'),
                'utf-8',
                (err, content) => {
                    if(err) reject(err)
                    else resolve(JSON.parse(content));
                }
            )
        });
    }

    static async addCartItem(dishItem, priceToPlus) {
        const cart = await Cart.getCart();

        cart[0].dishes.push(dishItem);
        cart[0].total_price = cart[0].total_price + priceToPlus;

        fs.writeFile(
            path.join(__dirname, '../variables', 'cart.json'),
            JSON.stringify(cart),
            (err) => {
                if(err) {
                    throw err;
                }
            }
        )
    }

    static async cleanCart() {
        let cart = await Cart.getCart();

        cart = [
            {"total_price": 0, "dishes": []}
        ];

        fs.writeFile(
            path.join(__dirname, '../variables', 'cart.json'),
            JSON.stringify(cart),
            (err) => {
                if(err) {
                    throw err;
                }
            }
        )
    }

    static async deleteCartItem(id) {
        const cart = await Cart.getCart();

        const index = cart[0].dishes.findIndex(item => item.id === id);

        cart[0].total_price = cart[0].total_price - cart[0].dishes[index].price;

        cart[0].dishes.splice(index, 1);

        fs.writeFile(
            path.join(__dirname, '../variables', 'cart.json'),
            JSON.stringify(cart),
            (err) => {
                if(err) {
                    throw err;
                }
            }
        )
    }
}

module.exports = Cart;