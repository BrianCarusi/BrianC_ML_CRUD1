const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products",{productos: products})
	},

	detail: (req, res) => {
		let id = parseInt(req.params.id)
		let producto_seleccionado = products.find( product => product.id == id)
		res.render("detail",{productDetail:producto_seleccionado})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {


			 const sendString = `--name :${ req.body.name}--
			 \n--Price:
			 ${ req.body.price}--
			 \n--Discount:
			 ${req.body.discount}--
			 \n--Category:
			 ${req.body.category}--
			 \n--Description:
			 ${req.body.description}`

	
		res.send(sendString)
	},

	// Update - Form to edit
	edit: (req, res) => {
		let id = parseInt(req.params.id)
		let producto_seleccionado = products.find( product => product.id == id)
		res.render("product-edit-form",{productToEdit:producto_seleccionado})
	},
	// Update - Method to update
	update: (req, res) => {
		let name = req.body.name
		res.send("updateado"+" "+name)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		try{
		let id = req.params.id
		console.log(id)
		}
		catch(err){
			console.log("error")
		}
		res.send("Producto eliminado")
	}
};

module.exports = controller;