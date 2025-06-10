class MyAbout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    // Load HTML and CSS
    const [html, css] = await Promise.all([
      fetch('components/about.html').then(res => res.text()),
      fetch('components/about.css').then(res => res.text())
    ]);

    // Inject styles and HTML into shadow root
    this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;

    // Setup scroll-based animation
    const layer = this.shadowRoot.querySelector('.layer');
    if (layer) {
      window.addEventListener('scroll', () => {
        const value = window.scrollY;
        layer.style.left = `${value}px`;
      });
    }
  }
}

customElements.define('my-about', MyAbout);
