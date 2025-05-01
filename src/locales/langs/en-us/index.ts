import common from './common'
import form from './form'
import page from './pages'
import request from './request'
import route from './route'
import theme from './theme'

const local: App.I18n.Schema['translation'] = {
  common,
  form,
  page,
  request,
  route,
  theme,
  datatable: {
    itemCount: 'Total {total} items',
  },
  dropdown: {
    closeAll: 'Close All',
    closeCurrent: 'Close Current',
    closeLeft: 'Close Left',
    closeOther: 'Close Other',
    closeRight: 'Close Right',
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
