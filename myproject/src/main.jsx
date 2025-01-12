import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CopilotKit } from "@copilotkit/react-core"

ReactDOM.createRoot(document.getElementById('root')).render(
    <CopilotKit runtimeUrl="https://fullstack-todo-ai-1.onrender.com/copilotkit">
      <App />
    </CopilotKit>
)
