export interface SendCodeReq {
    email: string;
}

export interface RegisterReq {
    email: string;
    password: string;
    confirmPassword: string;
    code: string;
}

export interface LoginReq {
    email: string;
    password: string;
}

export interface ChangePasswordReq {
    oldPassword: string;
    newPassword: string;
}

export interface DeleteAccountReq {
    password: string;
}

export interface LoginResData {
    token: string;
    userId: number;
    username: string;
    email: string;
    bio: string;
    avatar: string;
    role: string;
    createTime: Date;
    updateTime: Date;
    [property: string]: any;
}

export interface RegisterResData {
    userId: number;
    username: string;
    email: string;
    bio: string;
    avatar: string;
    role: string;
    createTime: Date;
    updateTime: Date;
    token: string;
    [property: string]: any;
}

export interface SendCodeResData {
    message: string;
    success: boolean;
    [property: string]: any;
}

export interface ChangePasswordResData {
    message: string;
    success: boolean;
    [property: string]: any;
}

export interface DeleteAccountResData {
    message: string;
    success: boolean;
    [property: string]: any;
}