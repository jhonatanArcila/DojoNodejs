var promise = require('bluebird');
var options = {
	promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://wixhnteo:49jjO1skwJ7KhygjLJlyVZL2Dof7g69f@elmer.db.elephantsql.com:5432/wixhnteo';
var db = pgp(connectionString);

function getAllRestaurants(req, res, next){
	db.any('select * from restaurant').then(function (data){
		res.status(200).json({
			status: 'Exitoso', 
			data: data,
			message: 'Recuperados todos los restaurantes'
		});
	}).catch(function(err){
		return next(err);
	});
};

function getAllMenus(req, res, next){
	db.any('select * from menu').then(function (data){
		res.status(200).json({
			status: 'Exitoso', 
			data: data,
			message: 'Recuperados todos los menus'
		});
	}).catch(function(err){
		return next(err);
	});
};

function getRestaurantByName(req,res,next){
	var name = req.params.name;
	db.any('select * from restaurant where name = $1',name).then(function (data){
		res.status(200).json({
			status: 'Exitoso', 
			data: data,
			message: 'Recuperados restaurantes por nombre'
		});
	}).catch(function(err){
		return next(err);
	});
};

function getMenuByNameRestaurant(req,res,next){
	var name = req.params.name;
	db.any('select m.id,m.name,m.description,m.price,m.restaurant from menu m, restaurant r where r.name = $1 AND r.id = m.restaurant',name).then(function (data){
		res.status(200).json({
			status: 'Exitoso', 
			data: data,
			message: 'Recuperados menu por nombre de restaurante'
		});
	}).catch(function(err){
		return next(err);
	});
};

function createMenus(req,res,next){
	db.none('insert  into Menu(name,description, price, restaurant) values($1,$2,$3,$4)',
	[req.body.name,req.body.description,parseInt(req.body.price), parseInt(req.body.restaurant)] )
	.then(function (){
		res.status(200).json({
			status: 'Exitoso', 
			message: 'Insertado menu'
		});
	}).catch(function(err){
		return next(err);
	});
};

function createRestaurant(req,res,next){
	db.none('insert  into restaurant(name,city, address, phone) values($1,$2,$3,$4)',
	[req.body.name,req.body.city,req.body.address, parseInt(req.body.phone)] )
	.then(function (){
		res.status(200).json({
			status: 'Exitoso', 
			message: 'Insertado restaurante'
		});
	}).catch(function(err){
		return next(err);
	});
};

function removeRestaurant(req,res,next){
	var restaurantID = parseInt(req.params.id);
	db.result('delete from restaurant where id = $1', restaurantID).then(function (){
		res.status(200).json({
			status: 'Exitoso', 
			message: 'Removido un restaurante'
		});
	}).catch(function(err){
		return next(err);
	});
};

function removeMenu(req,res,next){
	var menuID = parseInt(req.params.id);
	db.result('delete from menu where id = $1', menuID).then(function (){
		res.status(200).json({
			status: 'Exitoso', 
			message: 'Removido un menu'
		});
	}).catch(function(err){
		return next(err);
	});
};

function updateMenu(req,res,next){
	db.none('update menu set name = $1,description = $2, price = $3, restaurant = $4 where id = $5',
	[req.body.name,req.body.description,parseInt(req.body.price), parseInt(req.body.restaurant), parseInt(req.params.id)] )
	.then(function (){
		res.status(200).json({
			status: 'Exitoso', 
			message: 'Menu actualizado'
		});
	}).catch(function(err){
		return next(err);
	});
};


function updateRestaurant(req,res,next){
	db.none('update restaurant set name = $1,city = $2, address = $3, phone = $4 where id = $5',
	[req.body.name,req.body.city,req.body.address, parseInt(req.body.phone), parseInt(req.params.id)] )
	.then(function (){
		res.status(200).json({
			status: 'Exitoso', 
			message: 'Restaurante actualizado'
		});
	}).catch(function(err){
		return next(err);
	});
};

module.exports = {
	getAllRestaurants : getAllRestaurants,
	getRestaurantByName : getRestaurantByName,
	createRestaurant : createRestaurant,
	removeRestaurant : removeRestaurant,
	updateRestaurant : updateRestaurant,
	getAllMenus : getAllMenus,
	createMenus: createMenus,
	removeMenu: removeMenu,
	updateMenu: updateMenu,
	getMenuByNameRestaurant: getMenuByNameRestaurant
};
