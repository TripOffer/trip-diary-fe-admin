import {transformRecordToOption} from "@/utils/common.ts";

export const GLOBAL_HEADER_MENU_ID = '__GLOBAL_HEADER_MENU__'

export const GLOBAL_SIDER_MENU_ID = '__GLOBAL_SIDER_MENU__'

export const loginModuleRecord: Record<UnionKey.LoginModule, App.I18n.I18nKey> = {
    'code-login': 'page.login.codeLogin.title',
    'pwd-login': 'page.login.pwdLogin.title',
    'register': 'page.login.register.title',
    'reset-pwd': 'page.login.resetPwd.title',
}

export const info = `██████╗ ███████╗ █████╗  ██████╗████████╗███████╗ ██████╗ ██╗   ██╗██████╗ ███████╗ █████╗ ███╗   ██╗
██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔═══██╗╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗████╗  ██║
██████╔╝█████╗  ███████║██║        ██║   ███████╗██║   ██║ ╚████╔╝ ██████╔╝█████╗  ███████║██╔██╗ ██║
██╔══██╗██╔══╝  ██╔══██║██║        ██║   ╚════██║██║   ██║  ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██║██║╚██╗██║
██║  ██║███████╗██║  ██║╚██████╗   ██║   ███████║╚██████╔╝   ██║   ██████╔╝███████╗██║  ██║██║ ╚████║
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚══════╝ ╚═════╝    ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝`;
