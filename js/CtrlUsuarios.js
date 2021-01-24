import { CtrlAbc } from "../lib/CtrlAbc.js";
import { DaoPublicaciones } from "./DaoPublicaciones.js";
import { DaoPrivilegios } from "./DaoPrivilegios.js";
import { DaoUsuarios } from "./DaoUsuarios.js";
import {InfoPublicacion } from "./InfoPublicacion.js";
import { InfoPrivilegio } from "./InfoPrivilegio.js";
import { InfoUsuario } from "./InfoUsuario.js";

/** @extends {CtrlAbc<InfoUsuario>} */
export class CtrlUsuarios extends CtrlAbc {
  /** @param {string} mensajeNoEncontrado
   * @param {DaoUsuarios} daoUsuarios
   * @param {DaoPublicaciones} daoPublicaciones
   * @param {DaoPrivilegios} daoPrivilegios */
  constructor(mensajeNoEncontrado, daoUsuarios, daoPublicaciones,
    daoPrivilegios) {
    super(mensajeNoEncontrado, daoUsuarios);
    this._daoPublicaciones = daoPublicaciones;
    this._daoPrivilegios = daoPrivilegios;
  }
  /** @param {(error: Error)=>void} callbackError
   * @param {(pasatiempos:InfoPublicacion[])=>void} callbackPublicaciones
   * @param {(privilegios:InfoPrivilegio[])=>void} callbackPrivilegios */
  foráneas(callbackError, callbackPublicaciones, callbackPrivilegios) {
    this._daoPublicaciones.consulta(callbackError, callbackPublicaciones);
    this._daoPrivilegios.consulta(callbackError, callbackPrivilegios);
  }
}