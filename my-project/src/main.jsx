import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CopilotKit } from "@copilotkit/react-core"

ReactDOM.createRoot(document.getElementById('root')).render(
    <CopilotKit publicApiKey="ck_pub_8bbd49b5b226075af7b54c1e397c5751">
      <App />
    </CopilotKit>
)
