import Validator from "../public/javascripts/validator.esm.js";

const usernamePattern = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,8}$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{8,12}$/;

const checks = {
  required(value) {
    return value !== "" && value !== undefined && value !== null;
  },

  is_username(value) {
    return usernamePattern.test(value);
  },

  is_pwd(value) {
    return passwordPattern.test(value);
  },

  same_pwd(value, values) {
    return value === values.pwd;
  },
};

export default class RegExpVerify {
  constructor(type, successCallback, errorCallback) {
    this.type = type;
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
    this.form = document.querySelector(`#${this.type}Form`);
    if (!this.form) {
      throw new Error("没有相应表单");
    }
    this.submitIntercept();
  }

  submitIntercept() {
    this.formMap = {
      register: {
        username: "required|is_username",
        pwd: "required|is_pwd",
        confirmPwd: "required|same_pwd",
      },
      login: {
        username: "required|is_username",
        pwd: "required|is_pwd",
      },
    };
    this.msgMap = {
      register: {
        username: "账号必填|账号须为6～8位，且同时包含字母和数字",
        pwd: "密码必填|密码须为8～12位，且包含大写、小写字母和数字",
        confirmPwd: "请再次输入密码|两次输入密码不一致",
      },
      login: {
        username: "账号必填|账号须为6～8位，且同时包含字母和数字",
        pwd: "密码必填|密码须为8～12位，且包含大写、小写字母和数字",
      },
    };

    this.validator = this.validatorFactor();

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const values = this.validator.getValues();
      const valid = this.validator.allValid();
      if (valid) {
        this.successCallback && this.successCallback(values);
      } else {
        this.errorCallback && this.errorCallback(this.validator.errorMessages);
      }
    });
  }

  validatorFactor() {
    const ruleMap = this.formMap[this.type];
    const msgMap = this.msgMap[this.type];

    const rules = this.outPutValidator(ruleMap, msgMap);
    return new Validator({
      form: this.form,
      rules,
    });
  }

  outPutValidator(ruleMap, msgMap) {
    let result = {};
    for (const [filedName, ruleText] of Object.entries(ruleMap)) {
      let ruleNames = ruleText.split("|");
      let messages = msgMap[filedName].split("|");
      result[filedName] = {
        validate(value, values) {
          for (let i = 0; i < ruleNames.length; i++) {
            const ruleName = ruleNames[i];
            const check = checks[ruleName];
            if (!check) {
              throw new Error(`未定义校验规则 ${ruleName}`);
            }
            if (!check(value, values)) {
              return messages[i];
            }
          }
          return "";
        },
      };
    }
    return result;
  }
}
