import { DaoAbc } from "../lib/DaoAbc.js";
import { paraTodos } from "../lib/util.js";
import { DaoPublicaciones } from "./DaoPublicaciones.js";
import { DaoPrivilegios } from "./DaoPrivilegios.js";
import { DaoStorage } from "./DaoStorage.js";
import { InfoUsuario } from "./InfoUsuario.js";

/** @implements {DaoAbc<InfoUsuario>} */
export class DaoUsuarios {
  /** @param {{collection: (col: string) => any;}} firestore
   * @param {DaoPublicaciones} daoPublicaciones
   * @param {DaoPrivilegios} daoPrivilegios
   * @param {DaoStorage} daoStorage */
  constructor(firestore, daoPublicaciones, daoPrivilegios, daoStorage) {
    this._colección = firestore.collection("USUARIO");
    this._daoPublicaciones = daoPublicaciones;
    this._daoPrivilegios = daoPrivilegios;
    this._daoStorage = daoStorage;
  }
  /** Crea un usuario a partir de un documento.
 * @return {Promise<InfoUsuario>} */
  async _cargaUsuario(doc) {
    if (doc.exists) {
      const data = doc.data();
      return new InfoUsuario({
        email: doc.id,
        avatar: null,
        urlDeAvatar: await this._daoStorage.url(doc.id),
        publicaciones: await this._daoPublicaciones.busca(data.PUB_ID),
        privilegios: await this._daoPrivilegios.buscaMuchos(data.PRIV_IDS)
      });
    } else {
      return null;
    }
  }

  /** @param {(error: Error)=>void} callbackError
   * @param {(modelos:InfoUsuario[])=>void} callback */
  consulta(callbackError, callback) {
    this._colección.onSnapshot(
      async querySnapshot => callback(await Promise.all(
        paraTodos(querySnapshot, doc => this._cargaUsuario(doc)))),
      /** @param {Error} error */
      error => {
        callbackError(error);
        // Intenta reconectarse.
        this.consulta(callbackError, callback);
      });
  }
  /** @param {string} id
   * @returns {Promise<InfoUsuario>} */
  async busca(id) {
    let doc = id ? await this._colección.doc(id).get() : { exists: false };
    return this._cargaUsuario(doc);
  }
  /** @param {InfoUsuario} modelo
   * @returns {Promise<void>} */
  async _modificaInterno(modelo) {
    await this._colección.doc(modelo.email).set({
      PUB_ID: modelo.publicacion ? (modelo.publicacion.id || null) : "",
      PRIV_IDS: modelo.privilegios.map(p => p.nombre),
      EDAD_USU: modelo.edad,
      ESC_USU: modelo.escuela,
      NOM_USU: modelo.nombre,
      TEL_USU: modelo.telefono
    });
    if (modelo.avatar && modelo.avatar.size > 0) {
      await this._daoStorage.sube(modelo.email, modelo.avatar);
    }
  }
  /** @param {InfoUsuario} modelo
   * @returns {Promise<void>} */
  async agrega(modelo) {
    modelo.validaAlAgregar();
    await this._modificaInterno(modelo);
  }
  /** @param {InfoUsuario} modelo
   * @returns {Promise<void>} */
  async modifica(modelo) {
    modelo.validaAlModificar();
    await this._modificaInterno(modelo);
  }
  /** @param {string} id
   * @returns {Promise<void>} */
  async elimina(id) {
    await this._colección.doc(id).delete();
    await this._daoStorage.elimina(id);
  }
}