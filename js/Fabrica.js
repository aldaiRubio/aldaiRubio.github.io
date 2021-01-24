import { CtrlAbc } from "../lib/CtrlAbc.js";
import { CtrlSesión } from "./CtrlSesion.js";
import { CtrlUsuarios } from "./CtrlUsuarios.js";
import { DaoPublicaciones } from "./DaoPublicaciones.js";
import { DaoPrivilegios } from "./DaoPrivilegios.js";
import { DaoStorage } from "./DaoStorage.js";
import { DaoUsuarios } from "./DaoUsuarios.js";
import { ForáneasDeUsuarios } from "./ForaneasDeUsuarios.js";

/** Usa el patrón Singleton. */
export class Fábrica {
  constructor() {
    // @ts-ignore
    const firestore = firebase.firestore();
    // @ts-ignore
    const storage = firebase.storage();
    // @ts-ignore
    const auth = firebase.auth();
    // @ts-ignore
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    this.daoStorage = new DaoStorage(storage);
    this.daoPublicaciones = new DaoPublicaciones(firestore, this.daoStorage);
    this.daoPrivilegios = new DaoPrivilegios(firestore);
    this.daoUsuarios = new DaoUsuarios(firestore, this.daoPublicaciones,
      this.daoPrivilegios, this.daoStorage);
    this.ctrlSesión = new CtrlSesión(auth, provider, this.daoUsuarios);
    this.ctrlPublicaciones =
      new CtrlAbc("No se encontró la publicación.", this.daoPublicaciones);
    this.ctrlUsuarios = new CtrlUsuarios("No se encontró la publicación.",
      this.daoUsuarios, this.daoPublicaciones, this.daoPrivilegios);
    this.foráneasDeUsuarios = new ForáneasDeUsuarios();
  }
}
Fábrica.instancia = Object.freeze(new Fábrica());