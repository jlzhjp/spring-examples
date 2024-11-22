import { use, useState } from "react"
import { AuthorizationContext } from "../lib/AuthorizationProvider"
import { useNavigate } from "react-router-dom"
import { login } from "../lib/api"

export default function LoginView() {
  const navigate = useNavigate()
  const { setAuth } = use(AuthorizationContext)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email")!.toString()
    const password = formData.get("password")!.toString()

    try {
      const data = await login({ email, password })
      setAuth({ token: data.token })
      navigate("/")
    } catch (error) {
      setErrorMessage(JSON.stringify(error, null, 2))

      const dialog = document.querySelector(
        "#error-dialog"
      ) as HTMLDialogElement

      dialog.showModal()
    }
  }

  return (
    <>
      <dialog id="error-dialog" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Error</h3>
          <p className="py-4 break-words">{errorMessage}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <form action={handleSubmit} className="flex items-center flex-col gap-4">
        <h2 className="text-2xl">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full max-w-xs"
        />
        <button className="btn">Login</button>
      </form>
    </>
  )
}
