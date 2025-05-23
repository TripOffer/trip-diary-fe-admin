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
    collapse: '用户信息',
    expand: '邮箱',
    fullscreen: '权限',
    fullscreenExit: '性别',
    lang: '创建日期',
    pin: '点击更改权限',
    reload: '刷新页面',
    themeConfig: '主题配置',
    themeSchema: '数据总览',
    unpin: '切换语言',
  },
  page,
  request: request,
  route,
  system: {
    errorReason: '标签',
    reload: '警告：审核拒绝是不可逆操作，所有数据将被永久删除！请谨慎操作。',
    title: '审核拒绝原因',
    updateCancel: '操作成功',
    updateConfirm: '操作失败',
    updateContent: '请输入拒绝原因',
    updateTitle: '系统版本更新通知',
  },
}

export default local
