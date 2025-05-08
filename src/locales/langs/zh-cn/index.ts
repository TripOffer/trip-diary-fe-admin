import common from './common'
import form from './form'
import page from './page.ts'
import route from './route'
import request from './request'

const local: App.I18n.Schema['translation'] = {
  common,
  datatable: {
    itemCount: '共 {{total}} 条',
  },
  form,
  icon: {
    collapse: '折叠菜单',
    expand: '展开菜单',
    fullscreen: '全屏',
    fullscreenExit: '退出全屏',
    lang: '切换语言',
    pin: '固定',
    reload: '刷新页面',
    themeConfig: '主题配置',
    themeSchema: '主题模式',
    unpin: '取消固定',
  },
  page,
  request: request,
  route,
  system: {
    errorReason: '错误原因',
    reload: '重新渲染页面',
    title: 'Soybean 管理系统',
    updateCancel: '稍后再说',
    updateConfirm: '立即刷新',
    updateContent: '检测到系统有新版本发布，是否立即刷新页面？',
    updateTitle: '系统版本更新通知',
  },
}

export default local
