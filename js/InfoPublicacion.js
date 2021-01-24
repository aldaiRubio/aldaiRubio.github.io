import { valida } from "../lib/util.js";

/** @typedef {Object} ParamPublicacion
 * @property {string} id
 * @property {string} nombre */

export class InfoPublicacion {
  /** @param {ParamPublicacion} param0 */
  constructor({ id, nombre }) {
    this.id = id;
    this.nombre = nombre;
  }
  valida() {
    valida(this.nombre, "Falta proporcionar el nombre.");
  }
}