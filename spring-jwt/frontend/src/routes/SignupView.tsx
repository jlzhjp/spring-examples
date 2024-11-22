import { use, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthorizationContext } from "../lib/AuthorizationProvider"
import { signup } from "../lib/api"
import { Role } from "../lib/types"

export default function SignupView() {
  const navigate = useNavigate()
  const { setAuth } = use(AuthorizationContext)
  const [errorMessage, setErrorMessage] = useState("")

  const showDialog = (message: string) => {
    const dialog = document.querySelector("#error-dialog") as HTMLDialogElement
    setErrorMessage(message)
    dialog.showModal()
  }

  const handleSubmit = async (formData: FormData) => {
    try {
      const firstname = formData.get("firstname")!.toString()
      const lastname = formData.get("lastname")!.toString()
      const email = formData.get("email")!.toString()
      const password = formData.get("password")!.toString()
      const role = formData.get("role")!.toString()

      const data = await signup({
        firstname,
        lastname,
        email,
        password,
        role: role as Role,
      })
      setAuth({ token: data.token })
      navigate("/")
    } catch (error) {
      showDialog(JSON.stringify(error, null, 2))
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

      <form
        action={handleSubmit}
        className="flex items-stretch flex-col gap-4 w-96 mx-auto"
      >
        <h2 className="text-2xl text-center">Sign up</h2>
        <div className="flex flex-row">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            className="input input-bordered w-full mr-2"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            className="input input-bordered w-full"
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full"
        />
        <select
          defaultValue="_"
          name="role"
          className="select select-bordered w-full"
        >
          <option value="_" disabled>
            Role
          </option>
          <option value="ADMIN">Administrator</option>
          <option value="USER">User</option>
        </select>
        <button className="btn">Sign up</button>
      </form>
    </>
  )
}
