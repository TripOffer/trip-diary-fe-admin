import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import './index.css'
import App from './App.tsx'
import { App as AntdApp, ConfigProvider} from "antd";
import zhCN from "antd/es/locale/zh_CN";
import {setupI18n} from "@/locales";
import FallbackRender from "@/component/ErrorBoundary.tsx";

function setupApp() {
    setupI18n()

    const container = document.getElementById('root')
    if(!container) return;
    const root = createRoot(container)
    const jsx = (
        <AntdApp>
            <ErrorBoundary FallbackComponent={FallbackRender}>
                <ConfigProvider locale={zhCN}>
                    <StrictMode>
                        <App />
                    </StrictMode>
                </ConfigProvider>
            </ErrorBoundary>
        </AntdApp>
    )
    root.render(jsx as React.ReactNode)
}

setupApp()