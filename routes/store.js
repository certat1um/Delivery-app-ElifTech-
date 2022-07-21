const {Router} = require('express');
const uniqid = require('uniqid');
const router = Router();
const Cart = require('../models/cart');
const Dish = require('../models/dish');

router.get('/', async (req, res) => {
  const dishes = await Dish.getStaticDishes();
  const cart = await Cart.getCart();
  res.render('index', {
      title: 'Homepage',
      dishes,
      cart
  });
});

router.get('/add-to-cartfile/:id', async (req, res) => {
  const dish = await Dish.getDishById(req.params.id);
  const obj = {};
  obj.id = uniqid();
  obj.type = dish.id;
  obj.name = dish.name;
  obj.count = 1;
  obj.price = dish.price;
  await Cart.addCartItem(obj, dish.price);
  res.redirect('/')
});

module.exports = router;