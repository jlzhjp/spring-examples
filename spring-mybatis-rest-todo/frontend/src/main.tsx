import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { SWRConfig } from "swr"

const API_BASE = "http://localhost:8080/api"

const fetcher = async (resource: string, init?: RequestInit) => {
  const response = await fetch(`${API_BASE}${resource}`, init)
  if (response.ok) {
    if (response.headers.get("Content-Type")?.includes("application/json")) {
      const dataObject = await response.json()
      return dataObject
    }
    return undefined
  }
  const errorObject = await response.json()
  throw errorObject
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig value={{ fetcher }}>
      <App />
    </SWRConfig>
  </StrictMode>
)
