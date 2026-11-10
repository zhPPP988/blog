import 'bootstrap/dist/css/bootstrap.min.css'
import '@wangeditor/editor/dist/css/style.css'

import '../styles/reset.css'
import '../styles/index.styl'

import Action from './actionControl.js'
import TemplateHandle from './templateControl.js'

import avatarUrl from '../assets/images/blogLogo.JPG'

new TemplateHandle(
  'headerAccount.hbs',
  '.blog-header__account',
  {
    isLogin: true,
    avatar: avatarUrl,
    userName: '会飞的鸟'
  }
)
new Action();
