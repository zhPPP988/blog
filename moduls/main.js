import RegExpVerify from "./accountRegExpVerify.js"

function renderErrors(type, errors = {}) {
  let form = document.querySelector(`#${type}Form`);
  form.querySelectorAll('.form-control[name]').forEach(inp => {
    let message = errors[inp.name] || '';
    let msgBox = document.querySelector(`.${type}-${inp.name}-errMsg`);
    msgBox.textContent = message;
    inp.style.border = message ? '1px solid red' : '';
  })
}

['login', 'register'].forEach(item => {
  new RegExpVerify(item, () => {
    renderErrors(item);
  }, (errors) => {
    renderErrors(item, errors)
  })
})

