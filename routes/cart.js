const {Router} = require('express');
const router = Router();
const Cart = require('../models/cart');
const Order = require('../models/order');

router.get('/shopping-cart', async (req, res) => {
  const cart = await Cart.getCart();
  res.render('shopping-cart', {
      title: 'Shopping Cart',
      cart
  });
});

router.get('/shopping-cart/delete-item/:id', async (req, res) => {
  const item = await Cart.deleteCartItem(req.params.id);
  res.redirect('/shopping-cart')
});

router.post('/shopping-cart/make-order', async (req, res) => {
  await Order.makeOrder(req.body);
  res.redirect('/shopping-cart');
});

module.exports = router;