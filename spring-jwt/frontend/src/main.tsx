import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import "./index.css"
import NoticeView from "./routes/NoticeView.tsx"
import SignupView from "./routes/SignupView.tsx"
import LoginView from "./routes/LoginView.tsx"
import AuthorizationProvider from "./lib/AuthorizationProvider.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Layout from "./routes/Layout.tsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<NoticeView />} />
      <Route path="signup" element={<SignupView />} />
      <Route path="login" element={<LoginView />} />
    </Route>
  )
)

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthorizationProvider>
        <RouterProvider router={router} />
      </AuthorizationProvider>
    </QueryClientProvider>
  </StrictMode>
)
