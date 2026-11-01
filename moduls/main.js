import RegExpVerify from "./accountRegExpVerify.js"

new RegExpVerify(
  'login',
  () => {
    console.log('格式校验通过');
  },
  (errors) => {
    console.log('校验失败：', errors);
  }
);