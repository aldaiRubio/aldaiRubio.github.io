import { valida } from "../lib/util.js";

/** @typedef {Object} ParamPublicacion
 * @property {string} id
 * @property {string} nombre 
 * @property {string} propietario
 * @property {string} descripcion
 * @property {file} archivo*/

export class InfoPublicacion {
  /** @param {ParamPublicacion} param0 */
  constructor({ id, nombre, propietario,descripcion,archivo,urlArchivo}) {
    this.id = id;
    this.nombre = nombre;
    this.propietario = propietario;
    this. descripcion = descripcion;
    this.archivo = archivo;
    this.urlArchivo = urlArchivo;
  }
  valida() {
    valida(this.nombre, "Falta proporcionar el nombre.");
    valida(this.descripcion, "Falta proporcionar la descripción.");
    valida(this.archivo, "Falta proporcionar el archivo.");
  }
  validaAlModificar(){
    valida(this.nombre, "Falta proporcionar el nombre.");
    valida(this.descripcion, "Falta proporcionar la descripción.");
    valida(this.archivo, "Falta proporcionar el archivo.");  
  }
}