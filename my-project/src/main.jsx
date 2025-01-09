import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CopilotKit } from "@copilotkit/react-core"

ReactDOM.createRoot(document.getElementById('root')).render(
    <CopilotKit runtimeUrl="http://localhost:3001/copilotkit">
      <App />
    </CopilotKit>
)
