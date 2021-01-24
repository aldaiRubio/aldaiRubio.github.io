import { valida } from "../lib/util.js";
import { InfoPublicacion } from "./InfoPublicacion.js";
import { InfoPrivilegio } from "./InfoPrivilegio.js";

/** @typedef {Object} ParamUsuario
 * @property {string} email
 * @property {File} avatar
 * @property {string} urlDeAvatar
 * @property {InfoPublicacion} publicacion
 * @property {InfoPrivilegio[]} privilegios */
export class InfoUsuario {
  /** @param {ParamUsuario} param0  */
  constructor({email, avatar, urlDeAvatar, publicacion: publicacion, privilegios}) {
    this.email = email;
    this.avatar = avatar;
    this.urlDeAvatar = urlDeAvatar;
    this.publicacion = publicacion;
    this.privilegios = privilegios;
  }
  validaAlAgregar() {
    valida(this.email, "Falta proporcionar el email.");
    valida(this.avatar && this.avatar.size > 0,
       "Falta proporcionar el avatar.");
  }
  validaAlModificar() {
    valida(this.email, "Falta proporcionar el email.");
  }
}