const { log } = require('console');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		res.render("index",{productos: products})
	},
	search: (req, res) => {
	
		    const filtrados = products.filter((producto) => {
				return Object.values(producto).some((valor) => valor == req.query.keywords);
			  });
			  console.log(filtrados.length);
			res.render("results",{filtro:filtrados})
		
	},
};

module.exports = controller;
