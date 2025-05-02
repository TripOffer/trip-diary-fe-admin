import BaseApi from "@/service/api/shared.ts";
import {
    SendCodeReq,
    RegisterReq,
    LoginReq,
    ChangePasswordReq,
    DeleteAccountReq,
    LoginResData,
    SendCodeResData,
    RegisterResData,
    ChangePasswordResData,
    DeleteAccountResData,
} from "@/service/api/auth/types.ts";

class Auth extends BaseApi {
    urls = {
        login: '/user/login',
        register: '/user/register',
        sendCode: '/user/send_code',
        changePassword: '/user/change_password',
        deleteAccount: '/user',
        getUserInfo: '/user/info',
    };
    tag = 'Auth';

    async login(data: LoginReq) {
        return this.http.post<LoginResData>(this.urls.login, data);
    }

    async register(data: RegisterReq) {
        return this.http.post<RegisterResData>(this.urls.register, data);
    }

    async sendCode(data: SendCodeReq) {
        return this.http.post<SendCodeResData>(this.urls.sendCode, data);
    }

    async changePassword(data: ChangePasswordReq) {
        return this.http.post<ChangePasswordResData>(this.urls.changePassword, data);
    }

    async deleteAccount(data: DeleteAccountReq) {
        return this.http.delete<DeleteAccountResData>(this.urls.deleteAccount, {data});
    }
}

export default new Auth();