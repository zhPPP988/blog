export default class Templatehandle {
  constructor(name = "modal", wrap = "body", data = {}) {
    this.name = name;
    this.wrap = wrap;
    this.data = data;
    this.ready = this.init();
  }

  async init() {
    this.wrap = $(this.wrap);
    let html = await this.getHtml();
    this.html = html;
    this.render();
    return this;
  }

  async getHtml() {
    let url = new URL(`../template/${this.name}`, import.meta.url);
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("读取失败");
    }
    let source = await response.text();
    let template = Handlebars.compile(source);
    let html = template(this.data);
    return html;
  }

  render() {
    this.wrap.html(this.html);
  }
}
