import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Preloader from "../components/Preloader"
import { getNotice, getUser } from "../lib/api"
import useJWT from "../lib/useJWT"
import { useState } from "react"

function UserCard() {
  const token = useJWT()

  const {
    isPending,
    error,
    data: user,
  } = useQuery({
    queryKey: ["user", token],
    queryFn: () => getUser(token!),
    enabled: !!token,
  })

  if (isPending) {
    return <Preloader />
  }

  if (error) {
    return (
      <div className="p-8">
        <div role="alert" className="alert alert-error">
          <span>{JSON.stringify(error, null, 2)}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="card shadow-md m-8 bg-secondary text-secondary-content">
      <div className="card-body">
        <p>
          <span className="font-bold">Name: </span>
          {user.firstname} {user.lastname}
        </p>
        <p>
          <span className="font-bold">Email: </span>
          {user.email}
        </p>
        <p>
          <span className="font-bold">Role: </span>
          {user.role}
        </p>
        <p>
          <span className="font-bold">Authorities </span>
          {user.authorities.join(", ")}
        </p>
      </div>
    </div>
  )
}

function Notice({ notice, onEdit }: { notice: string; onEdit: () => void }) {
  const token = useJWT()
  const { data: user } = useQuery({
    queryKey: ["user", token],
    queryFn: () => getUser(token!),
    enabled: !!token,
  })

  const handleEditButtonClick = () => onEdit()

  return (
    <>
      <div className="flex flex-row items-center gap-2">
        <div className="text-3xl flex-grow text-center">{notice}</div>
        {user?.authorities?.includes("WRITE") && (
          <button className="btn" onClick={handleEditButtonClick}>
            Edit
          </button>
        )}
      </div>
    </>
  )
}

function NoticeEditor({
  initialData,
  onCompleted,
}: {
  initialData: string
  onCompleted: () => void
}) {
  const token = useJWT()
  const queryClient = useQueryClient()
  const [notice, setNotice] = useState(initialData)

  const { mutate } = useMutation({
    mutationFn: async (data: string) => {
      await fetch("http://localhost:8080/notice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: data,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notice", token] })
    },
  })

  const handleButtonClick = () => {
    mutate(notice)
    onCompleted()
  }

  return (
    <div className="flex flex-row gap-2">
      <input
        className="input input-bordered flex-grow text-base-content"
        value={notice}
        onChange={(e) => setNotice(e.target.value)}
      />
      <button className="btn" onClick={handleButtonClick}>
        OK
      </button>
    </div>
  )
}

export default function NoticeView() {
  const token = useJWT()
  const [isEditing, setIsEditing] = useState(false)

  const {
    data: notice,
    isPending,
    error,
  } = useQuery({
    queryKey: ["notice", token],
    queryFn: () => getNotice(token!),
    enabled: !!token,
  })

  if (!token) {
    return (
      <div className="p-8">
        <div role="alert" className="alert alert-error">
          <span>Please Login First.</span>
        </div>
      </div>
    )
  }

  if (isPending) {
    return <Preloader />
  }

  if (error) {
    return (
      <div className="p-8">
        <div role="alert" className="alert alert-error">
          <span>{JSON.stringify(error, null, 2)}</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <UserCard />
      <div className="card m-8 p-4 bg-primary text-primary-content shadow-md">
        {isEditing ? (
          <NoticeEditor
            initialData={notice}
            onCompleted={() => setIsEditing(false)}
          />
        ) : (
          <Notice notice={notice} onEdit={() => setIsEditing(true)} />
        )}
      </div>
    </>
  )
}
