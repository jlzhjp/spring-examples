import { Link, Outlet } from "react-router-dom"
import { AuthorizationContext } from "../lib/AuthorizationProvider"
import { use } from "react"

function NavBarActions() {
  const { auth, setAuth } = use(AuthorizationContext)

  if (!auth) {
    return (
      <ul className="menu menu-horizontal px-1">
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    )
  }

  return (
    <button className="btn" onClick={() => setAuth(undefined)}>
      Logout
    </button>
  )
}

export default function Layout() {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" to="/">
            Spring Security JWT
          </Link>
        </div>
        <div className="flex-none">
          <NavBarActions />
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  )
}
