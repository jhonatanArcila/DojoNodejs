var express = require("express");
var router = express.Router();
var db = require("./queries");

router.get('/api/restaurants', db.getAllRestaurants);
router.get('/api/menus', db.getAllMenus);
router.get('/api/restaurants/:name', db.getRestaurantByName);
router.post('/api/restaurants',db.createRestaurant);
router.post('/api/menus',db.createMenus);
router.delete('/api/restaurants/:id', db.removeRestaurant);
router.delete('/api/menus/:id', db.removeMenu);
router.put('/api/restaurants/:id', db.updateRestaurant);
router.put('/api/menus/:id', db.updateMenu);
router.get('/api/menusByRestaurant/:name', db.getMenuByNameRestaurant);




module.exports = router;
