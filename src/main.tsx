import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App as AntdApp, ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { setupI18n } from '@/locales'
import FallbackRender from '@/component/ErrorBoundary.tsx'
import { RouterProvider } from 'react-router-dom'
import router from '@/router.tsx'

function setupApp() {
  setupI18n()
  const queryClient = new QueryClient()
  const container = document.getElementById('root')
  if (!container) return
  const root = createRoot(container)
  const jsx = (
    <AntdApp>
      <ErrorBoundary FallbackComponent={FallbackRender}>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider locale={zhCN}>
            <StrictMode>
              <RouterProvider router={router} />
            </StrictMode>
          </ConfigProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </AntdApp>
  )
  root.render(jsx as React.ReactNode)
}

setupApp()
