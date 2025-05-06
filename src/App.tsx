import './App.css'
import LangProvider from '@/features/lang/LangProvider.tsx'
import AntdProvider from '@/features/antd/AntdProvider.tsx'
import AntdContextHolder from '@/features/antd/AntdContextHolder.tsx'
import { LazyAnimate } from '@/features/animate'
import NavBar from '@/component/NavBar.tsx'
import { Outlet } from 'react-router'

function App() {
  return (
    <LangProvider>
      <AntdProvider>
        <AntdContextHolder>
          <LazyAnimate>
            <NavBar>
              <Outlet />
            </NavBar>
          </LazyAnimate>
        </AntdContextHolder>
      </AntdProvider>
    </LangProvider>
  )
}

export default App
