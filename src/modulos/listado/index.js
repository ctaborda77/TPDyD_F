
import Handlebars from 'handlebars';

import template from './template.html';

let database;

let motos = [];

export default (_database) => {
	database = _database;
	motos = [];
	listadomotos();
}

const listadomotos = () => {
	const lista = database
					.ref('/motos')
					.once("value")
					.then((datos_motos) => {
						
						datos_motos.forEach((element) => {
							const datosmotos = element.val();
							datosmotos.id = element.key;
							motos.push(datosmotos);
						});
						
						render();
					});
}

const render = () => {
	const t = Handlebars.compile(template);
	document.getElementById('main').innerHTML = t({ motos });
}