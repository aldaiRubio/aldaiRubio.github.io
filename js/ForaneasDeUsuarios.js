
import { cod } from "../lib/util.js";
import { InfoPublicacion } from "./InfoPublicacion.js";
import { InfoPrivilegio } from "./InfoPrivilegio.js";

const SIN_PUBLICACION = /* html */
  `<option value="">-- Sin publicacion --</option>`;

export class ForáneasDeUsuarios {
  /**@param {InfoPrivilegio} privilegio */
  renderPrivilegio(privilegio) {
    return (/* html */
      `<em>${cod(privilegio.nombre)}</em><br>
      ${cod(privilegio.descripción)}`);
  }
  /** @param {HTMLSelectElement} select
   * @param {string} valor
   * @param {InfoPublicacion[]} publicacion */
  muestraPublicaciones(select, valor, publicacion) {
    select.innerHTML = SIN_PUBLICACION +
      publicacion.map(p => {
        const selected = p.id === valor ? "selected" : "";
        return (/* html */
          `<option value="${cod(p.id)}" ${selected}>${cod(p.nombre)}</option>`);
      }).join("");
  }
  /** @param {HTMLElement} elemento
   * @param {string[]} valor
   * @param {InfoPrivilegio[]} privilegios */
  muestraPrivilegios(elemento, valor, privilegios) {
    const set = new Set(valor || []);
    elemento.innerHTML = privilegios.map(p => {
      const checked = set.has(p.nombre) ? "checked" : "";
      return (/* html */
        `<li>
          <label>
            <input type="checkbox" name="privilegios"
                value="${cod(p.nombre)}" ${checked}>
            <span>${this.renderPrivilegio(p)}</span>
          </label>
        </li>`)
    }).join("");
  }
}