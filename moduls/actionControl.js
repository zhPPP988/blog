import RegExpVerify from "./accountRegExpVerify.js";
import Http from "./http.js";

export default class Action {
  constructor() {
    this.formAgency();
  }

  formAgency() {
    function renderErrors(type, errors = {}) {
      let form = document.querySelector(`#${type}Form`);
      form.querySelectorAll(".form-control[name]").forEach((inp) => {
        let message = errors[inp.name] || "";
        let msgBox = document.querySelector(`.${type}-${inp.name}-errMsg`);
        msgBox.textContent = message;
        inp.style.border = message ? "1px solid red" : "";
      });
    }

    $("form").on("focus", "input", (e) => {
      $(e.target).css("border", "");
      $(`.${$(e.target).attr("id")}-errMsg`).text("");
    });

    ["login", "register"].forEach((item) => {
      new RegExpVerify(
        item,
        (value) => {
          renderErrors(item);
          let request = new Http({ type: item, data: value });
          request.send().then().catch();
        },
        (errors) => {
          renderErrors(item, errors);
        },
      );
    });
  }
}
