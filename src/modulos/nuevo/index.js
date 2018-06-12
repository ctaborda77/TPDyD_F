

import Handlebars from 'handlebars';
import { guid } from '../../utils';

import template from './template.html';

let mensaje = '';

let database;

export default (_database) => {
  database = _database;
  render();
};

const crearNuevaMoto = (e) => {
  e.preventDefault();

  const moto = {
    id: guid(),
    marca: document.getElementById('marca').value,
    modelo: document.getElementById('modelo').value,
    cilindrada: document.getElementById('cilindrada').value,
    año: document.getElementById('año').value,
  };
console.log(moto);
  database.ref(`motos/${moto.id}`).set({
    marca: moto.marca,
    modelo: moto.modelo,
    cilindrada: moto.cilindrada,
    año: moto.año,
  })
  .then(() => {
    mensaje = 'Moto creada correctamente!';
    render();
  })
  return false;
 
};

const render = () => {
  const t = Handlebars.compile(template);
  document.getElementById('main').innerHTML = t ({mensaje});
  document.getElementById('boton-nuevo').onclick = crearNuevaMoto;
}