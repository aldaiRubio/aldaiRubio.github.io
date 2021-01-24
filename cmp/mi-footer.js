class MiFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = /* html */
            `Copyright &copy; 2021 ARPA.`;
    }
}
customElements.define("mi-footer", MiFooter);