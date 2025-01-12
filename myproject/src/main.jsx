import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CopilotKit } from "@copilotkit/react-core"

const runtimeUrl = `${import.meta.env.VITE_BACKEND_URL}/copilotkit`;

ReactDOM.createRoot(document.getElementById("root")).render(
    <CopilotKit runtimeUrl={runtimeUrl}>
        <App />
    </CopilotKit>
);