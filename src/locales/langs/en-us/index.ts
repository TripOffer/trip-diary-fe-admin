import common from './common'
import form from './form'
import page from './page.ts'
import request from './request'
import route from './route'

const local: App.I18n.Schema['translation'] = {
  common,
  form,
  page,
  request,
  route,
  datatable: {
    itemCount: 'Total {total} items',
  },
  icon: {
    collapse: 'Collapse Menu',
    expand: 'Expand Menu',
    fullscreen: 'Fullscreen',
    fullscreenExit: 'Exit Fullscreen',
    lang: 'Switch Language',
    pin: 'Pin',
    reload: 'Reload Page',
    themeConfig: 'Theme Configuration',
    themeSchema: 'Theme Schema',
    unpin: 'Unpin',
  },
  system: {
    errorReason: 'Cause Error',
    reload: 'Reload Page',
    title: 'SoybeanAdmin',
    updateCancel: 'Later',
    updateConfirm: 'Refresh immediately',
    updateContent:
      'A new version of the system has been detected. Do you want to refresh the page immediately?',
    updateTitle: 'System Version Update Notification',
  },
}

export default local
