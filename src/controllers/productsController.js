const fs = require('fs');
const path = require('path');
const Product = require('../data/product');
const {readJSON,writeJSON} = require("../data/read_modify")

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

		const newProduct = new Product(req.body)
		newProduct.image = req.file.originalname
        const allProducts = readJSON("productsDataBase.json")
		allProducts.push(newProduct)
		writeJSON(allProducts,"productsDataBase.json")
	
		res.send('Producto Creado')

	},

	// Update - Form to edit
	edit: (req, res) => {
		let id = parseInt(req.params.id)
		let producto_seleccionado = products.find( product => product.id == id)
		res.render("product-edit-form",{productToEdit:producto_seleccionado})
	},
	// Update - Method to update
	update: (req, res) => {
		const { name, price, discount, description, category, image} = req.body;
		
		const productModify = products.map(product => {
			if (product.id === +req.params.id) {
				product.name = name.trim();
				product.price = +price;
				product.discount = +discount;
				product.category = category;
				product.description = description.trim();
				product.image= req.file.originalname;
			}
			return product
		});
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 3), 'utf8');
		return res.redirect('/products');
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {

		const productsModify = products.filter(product => product.id != +req.params.id);
		fs.writeFileSync(productsFilePath, JSON.stringify(productsModify, null, 3), 'utf8');
		return res.redirect('/products');
	}
};

module.exports = controller;