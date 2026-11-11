import $ from "jquery";
import SmeRouter from "sme-router";
import editorControl from "./editorControl.js"
import Templatehandle from "./templateControl.js";
const Router = SmeRouter.default || SmeRouter;
const router = new Router("page", "html5");

const preIndex = $(".blog-article").html();

const ROUTER_MAP = {
  "/write": ".blog-article",
  "/index": ".blog-article",
  "/preview": ".blog-article"
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
  editorControl.destroy();
  res.render(preIndex);
});

router.route("/preview", (req, res) => {
  const mount = init(req, res);
  let data = req.body;
  editorControl.destroy();
  new Templatehandle("articlePreview.hbs", mount, { body: data });
})

router.route("/write", (req, res) => {
  const mount = init(req, res);
  new Templatehandle("write.hbs", mount);
  editorControl.create();

});

router.route("*", (req, res) => {
  res.redirect("/index");
});

export default router;
