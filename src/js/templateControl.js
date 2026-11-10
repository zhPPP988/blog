import $ from 'jquery'

import loginTemplate from '../templates/login.hbs'
import writeTemplate from '../templates/write.hbs'
import articleTemplate from '../templates/article.hbs'
import headerAccountTemplate from '../templates/headerAccount.hbs'

const templateMap = {
  'login.hbs': loginTemplate,
  'write.hbs': writeTemplate,
  'article.hbs': articleTemplate,
  'headerAccount.hbs': headerAccountTemplate
}

export default class Templatehandle {
  constructor(name = "modal", wrap = "body", data = {}) {
    this.name = name;
    this.wrap = $(wrap);
    this.data = data;
    this.render();
  }

  getHtml() {
    const template = templateMap[this.name]
    if (!template) {
      throw new Error(`没有找到模板：${this.name}`)
    }
    return template(this.data)
  }


  render() {
    const html = this.getHtml()
    this.wrap.html(html)
  }
}
