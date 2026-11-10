import $ from "jquery";
import SmeRouter from "sme-router";
import {
  createEditor,
  createToolbar
} from "@wangeditor/editor";
import Templatehandle from "./templateControl.js";
const Router = SmeRouter.default || SmeRouter;
const router = new Router("page", "html5");

const preIndex = $(".blog-article").html();

const ROUTER_MAP = {
  "/write": ".blog-article",
  "/index": ".blog-article",
};

function init(req, res) {
  const selector = ROUTER_MAP[req.route];
  const mount = document.querySelector(selector);

  if (!mount) {
    throw new Error(`找不到路由挂载元素：${selector}`);
  }

  res._mount = mount;
  return mount;
}

// 缓存路由会跳过中间件，因此每次渲染前都重新确定挂载位置。
router.route("/index", (req, res) => {
  init(req, res);
  res.render(preIndex);
});

router.route("/write", (req, res) => {
  const mount = init(req, res);
  new Templatehandle("write.hbs", mount);
  const editor = createEditor({
    selector: "#blog-write__editor",
    config: {
      placeholder: "请输入文章内容..."
    }
  });

  createToolbar({
    editor,
    selector: "#blog-write__toolbar"
  });
});

router.route("*", (req, res) => {
  res.redirect("/index");
});

export default router;
