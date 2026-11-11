import $ from "jquery";
import { Modal } from "bootstrap";
import RegExpVerify from "./accountRegExpVerify.js";
import Http from "./http.js";
import Router from "./routerControl.js";
import editorControl from "./editorControl.js"

export default class Action {
  constructor() {
    this.formAgency();
    this.routerAgency();
    this.editorAgency();
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
          request
            .send()
            .then((response) => {
              if (response.data.code == 200) {
                Modal.getOrCreateInstance(
                  document.querySelector(`#${item}Modal`),
                ).hide();
              }
            })
            .catch();
        },
        (errors) => {
          renderErrors(item, errors);
        },
      );
    });
  }

  routerAgency() {
    $(document).on("click", "[data-router]", function (e) {
      e.preventDefault();
      let $target = $(this);
      let routerName = $target.data("router");
      Router.go(`/${routerName}`);
    });
  }

  editorAgency() {
    $(document).on('click', "button[data-editor-action]", function (e) {
      e.preventDefault();
      let action = $(e.currentTarget).data('editor-action');
      if (action === 'clear') {
        if (editorControl.isEmpty()) return;
        const confirmed = window.confirm(
          "确定要清空当前文章内容吗？"
        );
        if (!confirmed) {
          return;
        }
        editorControl.clear();
      }
      if (action === 'preview') {
        if (editorControl.isEmpty()) return;
        let data = editorControl.getHtml()
        console.log(data)
        Router.go('/preview', data)

      }
    })
  }
}
