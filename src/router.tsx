import { createHashRouter, type RouteObject } from 'react-router-dom' // 确保从正确的包导入
import App from '@/App.tsx'
import ChangePasswordPage from '@/pages/auth/changePassword.tsx'
import LoginPage from '@/pages/auth/login.tsx'
import RegisterPage from '@/pages/auth/register.tsx'
import NotFoundPage from '@/pages/404.tsx'
import ProtectedRoute from '@/component/ProtectedRoute.tsx'
import UserPage from '@/pages/user/index.tsx'
import { Navigate } from 'react-router'
import HomePage from '@/pages/home'
import TweetsPage from '@/pages/tweets'
import SearchPage from '@/pages/search/search.tsx'
import DiaryPage from '@/pages/detail/diary.tsx'

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/user',
        element: <UserPage />,
      },
      {
        path: '/tweets',
        element: <TweetsPage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/post/:id',
        element: <DiaryPage />,
      },
    ],
  } as RouteObject,
  {
    path: '/auth/login',
    element: <LoginPage />,
  } as RouteObject,
  {
    path: '/auth/register',
    element: <RegisterPage />,
  } as RouteObject,
  {
    path: '/auth/changePassword',
    element: <ChangePasswordPage />,
  } as RouteObject,
  {
    path: '*',
    element: <NotFoundPage />,
  } as RouteObject,
]

const router = createHashRouter(routes)

export default router
