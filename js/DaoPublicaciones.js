import { DaoAbc } from "../lib/DaoAbc.js";
import { paraTodos, trims } from "../lib/util.js";
import { InfoPublicacion } from "./InfoPublicacion.js";

/** @implements {DaoAbc<InfoPublicacion>} */
export class DaoPublicaciones {
  /** @param {{collection: (col: string) => any; }} firestore */
  constructor(firestore) {
    this._colección = firestore.collection("PUBLICACION");
  }
  /** Crea una publicacion a partir de un documento.
 * @return {InfoPublicacion} */
  _cargaPublicacion(doc) {
    if (doc.exists) {
      const data = doc.data();
      return new InfoPublicacion({
        id: doc.id,
        nombre: data.PUB_NOMBRE
      });
    } else {
      return null;
    }
  }

  /** @param {(error: Error)=>void} callbackError
   * @param {(modelos:InfoPublicacion[])=>void} callback */
  consulta(callbackError, callback) {
    /* Pide todos los registros de la colección "PUBLICACION" ordenados por
     * el campo "PUB_NOMBRE" de forma ascendente. */
    this._colección.orderBy("PUB_NOMBRE").onSnapshot(
      querySnapshot => callback(
        paraTodos(querySnapshot, doc => this._cargaPublicacion(doc))),
      /** @param {Error} error */
      error => {
        callbackError(error);
        // Intenta reconectarse.
        this.consulta(callbackError, callback);
      }
    );
  }
  /** @param {string} id
   * @returns {Promise<InfoPublicacion>} */
  async busca(id) {
    let doc = id ? await this._colección.doc(id).get() : { exists: false };
    return this._cargaPublicacion(doc);
  }
  /** @param {InfoPublicacion} modelo
   * @returns {Promise<void>} */
  async agrega(modelo) {
    modelo.valida();
    await this._colección.add({
      PUB_NOMBRE: trims(modelo.nombre)
    });
  }
  /** @param {InfoPublicacion} modelo
   * @returns {Promise<void>} */
  async modifica(modelo) {
    modelo.valida();
    await this._colección.doc(modelo.id).set({
      PUB_NOMBRE: trims(modelo.nombre)
    });
  }
  /** @param {string} id
   * @returns {Promise<void>} */
  async elimina(id) {
    await this._colección.doc(id).delete();
  }
}