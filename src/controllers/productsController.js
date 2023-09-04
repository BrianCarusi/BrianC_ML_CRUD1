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
	
		res.send(req.file)

	},

	// Update - Form to edit
	edit: (req, res) => {
		let id = parseInt(req.params.id)
		let producto_seleccionado = products.find( product => product.id == id)
		res.render("product-edit-form",{productToEdit:producto_seleccionado})
	},
	// Update - Method to update
	update: (req, res) => {
       const fileName = "img-sony-blueray.jpg"
	   try{
		file = req.file.originalname
	   }
	   catch(err){
            console.log("no hay imagen");
	   }
	  
	   console.log("cat",req.body.category)
	   const modified = products.map( producto =>{
                //console.log( producto.id == req.params.id)
			if (producto.id == req.params.id){
				
				producto.name =  req.body.name
				producto.price = req.body.price
				producto.discount = req.body.discount
                producto.description = req.body.description
				producto.category = req.body.category ? req.body.category : "visited"
				producto.image = fileName
			}
			return producto
		})

		 console.log(modified)
		 writeJSON(modified,"productsDataBase.json") 
		
		res.redirect("/products")

	},
	// Delete - Delete one product from DB
	destroy: (req, res) => {

		const productsModify = products.filter(product => product.id != +req.params.id);
		fs.writeFileSync(productsFilePath, JSON.stringify(productsModify, null, 3), 'utf8');
		return res.redirect('/products');
	}
};

module.exports = controller;