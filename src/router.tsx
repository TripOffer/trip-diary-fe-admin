import { createHashRouter, type RouteObject } from "react-router-dom"; // 确保从正确的包导入
import App from "@/App.tsx";
import ChangePasswordPage from "@/pages/auth/changePassword.tsx";
import LoginPage from "@/pages/auth/login.tsx";
import RegisterPage from "@/pages/auth/register.tsx";
import NotFoundPage from "@/pages/404.tsx";


const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [], // 可以填子路由
    } as RouteObject,
    {
        path: "/auth/login",
        element: <LoginPage />,
    } as RouteObject,
    {
        path: "/auth/register",
        element: <RegisterPage />,
    } as RouteObject,
    {
        path: "/auth/changePassword",
        element: <ChangePasswordPage />,
    } as RouteObject,
    {
        path: '*',
        element: <NotFoundPage />
    } as RouteObject
];

const router = createHashRouter(routes);

export default router;
