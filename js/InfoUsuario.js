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
  constructor({email, avatar, urlDeAvatar,edad,escuela,telefono,nombre,publicacion: publicacion, privilegios}) {
    this.email = email;
    this.avatar = avatar;
    this.urlDeAvatar = urlDeAvatar;
    this.telefono = telefono;
    this.edad=edad;
    this.escuela=escuela;
    this.nombre=nombre;
    this.publicacion = publicacion;
    this.privilegios = privilegios;
  }
  validaAlAgregar() {
    valida(this.email, "Falta proporcionar el email.");
    valida(this.avatar && this.avatar.size > 0,
       "Falta proporcionar el avatar.");
    valida(this.edad,"Falta proporcionar la edad");
    valida(this.telefono,"Falta proporcionar el telefono");
    valida(this.escuela,"Falta proporcionar la escuela");
    valida(this.nombre,"Falta proporcionar el nombre");
  }
  validaAlModificar() {
    valida(this.nombre,"Falta proporcionar el nombre");
    valida(this.email, "Falta proporcionar el email.");
    valida(this.edad,"Falta proporcionar la edad");
    valida(this.telefono,"Falta proporcionar el telefono");
    valida(this.escuela,"Falta proporcionar la escuela");    
  }
}