import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import DashboardPage from './DashboardPage'
import PracticeScreen from './pages/PracticeScreen'
import MockTestConfig from './pages/MockTestConfig'
import MockTestRunner from './pages/MockTestRunner'
import MockTestResult from './pages/MockTestResult'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/practice" element={<PracticeScreen />} />
        <Route path="/mock/config" element={<MockTestConfig />} />
        <Route path="/mock/start" element={<MockTestRunner />} />
        <Route path="/mock/result" element={<MockTestResult />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
