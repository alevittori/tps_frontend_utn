import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

// Interfaz para el detalle completo que devuelve GET /user/{id}
interface UserDetail {
  id: number;
  name: string;
  age: number;
  email: string;
  country: { id: number; name: string } | null;
  roles: { id: number; name: string }[];
}

export function UserList({ token }: { token: string }) {

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [me, setMe] = useState<User | null>(null);
  
  // Estado: ID del usuario seleccionado y su detalle
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUserDetail, setSelectedUserDetail] = useState<UserDetail | null>(null);

  const [loading, setLoading] = useState<boolean>(true); 

  // Cargar la lista de usuarios con manejo de loading y response.ok
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Para probar el error cambiar temporalmente a `${import.meta.env.VITE_API_URL}/usr`
    fetch(`${import.meta.env.VITE_API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        const data = await response.json();
        
        if (!response.ok) {
          setError(data.detail); // Muestra el detail en lugar de la lista
          setUsers([]);
          return;
        }
        
        setUsers(data);
      })
      .catch((err) => {
        setError("Error de red al conectar con la API");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  // Cargar mi propio usuario (Paso 6)
  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    const api = import.meta.env.VITE_API_URL;
    fetch(`${api}/user/me/id`, { headers })
      .then((response) => response.json())
      .then(({ id }) => fetch(`${api}/user/${id}`, { headers }))
      .then((response) => response.json())
      .then(setMe);
  }, [token]);

  // Cargar el detalle cuando cambia el ID seleccionado
  useEffect(() => {
    if (selectedUserId === null) {
      setSelectedUserDetail(null);
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/user/${selectedUserId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setSelectedUserDetail(data)); 
  }, [selectedUserId, token]);

    //console.log(selectedUserDetail)

  //if (error) return <p>{error}</p>;

  // Renderizado condicional para la Práctica 2
  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;


  return (
    <>
      <h1>Hola, {me?.name}</h1>
      
      <h2>Lista de Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {/* Hacemos clic en el nombre para ver su detalle */}
            <button 
              onClick={() => setSelectedUserId(user.id)}
              style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
            >
              {user.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Sección de la Práctica 1: Mostrar detalle del usuario seleccionado */}
      {selectedUserDetail && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc' }}>
          <h3>Detalle de: {selectedUserDetail.name}</h3>
          <p><strong>Email:</strong> {selectedUserDetail.email}</p>
          <p><strong>Edad:</strong> {selectedUserDetail.age}</p>
          <p><strong>País:</strong> {selectedUserDetail.country ? selectedUserDetail.country.name : 'Sin país'}</p>
          <p><strong>Roles:</strong> {selectedUserDetail.roles.map(r => r.name).join(', ') || 'Ninguno'}</p>
        </div>
      )}
    </>
  );
}
