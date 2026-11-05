import Action from "./actionControl.js";
import Templatehandle from "./templateControl.js";

new Templatehandle("headerAccount.hbs", ".blog-header__account", {
  isLogin: true,
  avatar: "./public/images/blogLogo.JPG",
  userName: "会飞的鸟",
});
new Action();
