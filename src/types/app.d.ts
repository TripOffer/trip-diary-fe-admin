// The global namespace for the app
declare namespace App {
  namespace I18n {
    type RouteKey = import()

    type LangType = 'en-US' | 'zh-CN'

    type LangOption = {
      key: LangType
      name: string
    }

    type Schema = {
      translation: {
        common: {

        },
        form: {

        },
        page: {

        },
        request: {

        },
        route: {

        },
        theme: {

        },
        datatable: {

        },
        dropdown: {

        },
        icon: {

        },
        system: {

        }
      }
    }
  }
}