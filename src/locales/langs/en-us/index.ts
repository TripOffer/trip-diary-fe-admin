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
    collapse: 'User Information',
    expand: 'Email',
    fullscreen: 'Permission',
    fullscreenExit: 'Gender',
    lang: 'Create Time',
    pin: 'Click to change the permission',
    reload: 'Reload Page',
    themeConfig: 'Theme Configuration',
    themeSchema: 'Theme Schema',
    unpin: 'Switch Language',
  },
  system: {
    errorReason: 'Tags',
    reload:
      'Warning: Review rejection is an irreversible operation, and all data will be permanently deleted! Please operate with caution.',
    title: 'Rejection Reason',
    updateCancel: 'Operation Success',
    updateConfirm: 'Operation Failure',
    updateContent: 'Please input the reason for rejection.',
    updateTitle: 'System Version Update Notification',
  },
}

export default local
