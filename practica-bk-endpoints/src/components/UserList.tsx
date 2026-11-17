import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

export function UserList({ token }: { token: string }) {

    const [users, setUsers] = useState<User[]>([])
    const [error, setError] = useState<string | null>(null)
    const [me, setMe] = useState<User | null>(null) // nuevo

    useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/user`, {
    headers: { Authorization: `Bearer ${token}` },
    })
    .then(async (response) => {
    const data = await response.json()
    if (!response.ok) {
    setError(data.detail)
    return
    }
    setUsers(data)
    })
    }, [token])

    useEffect(() => { // nuevo
    const headers = { Authorization: `Bearer ${token}` }
    const api = import.meta.env.VITE_API_URL
    fetch(`${api}/user/me/id`, { headers }) // 1) ¿quién soy? → { id }
    
    .then((response) => response.json())
    .then(({ id }) => fetch(`${api}/user/${id}`, { headers })) // 2) mis datos
    .then((response) => response.json())
    .then(setMe)
    }, [token])

    if (error) return <p>{error}</p>

    return (
    <>
    <h1>Hola, {me?.name}</h1>
    <ul>
    {users.map((user) => (
    <li key={user.id}>{user.name}</li>
    ))}
    </ul>
    </>
    )
}
