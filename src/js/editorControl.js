import {
  Boot,
  createEditor,
  createToolbar
} from "@wangeditor/editor";
import markdownModule from "@wangeditor/plugin-md";

Boot.registerModule(markdownModule);

class EditorControl {
  constructor(editorSelector = '#blog-write__editor', placeholder = "请输入文章内容...", toolbarSlector = "#blog-write__toolbar") {
    this.eSelector = editorSelector;
    this.placeholder = placeholder;
    this.tSelector = toolbarSlector;
    this.editor = null;
  }

  create() {
    this.destroy();
    this.editor = createEditor({
      selector: this.eSelector,
      config: {
        placeholder: this.placeholder
      }
    })
    createToolbar({
      editor: this.editor,
      selector: this.tSelector
    })
    return this.editor
  }

  isEmpty() {
    if (!this.editor) return true;
    return this.editor.isEmpty();
  }

  clear() {
    if (!this.editor) {
      return false;
    }

    this.editor.clear();

    return true;
  }

  destroy() {
    if (!this.editor) return;
    this.editor.destroy();
    this.editor = null;
  }

  getHtml() {
    if (this.isEmpty()) return "";
    return this.editor.getHtml();
  }
}

export default new EditorControl();