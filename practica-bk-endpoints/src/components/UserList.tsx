import { useEffect, useState, type SubmitEvent } from "react";

interface User {
  id: number;
  name: string;
}

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
  const [loading, setLoading] = useState<boolean>(true);
  const [me, setMe] = useState<User | null>(null);

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUserDetail, setSelectedUserDetail] = useState<UserDetail | null>(null);

  // Estados para la Práctica 3 
  const [searchText, setSearchText] = useState<string>("");
  const [searchUrl, setSearchUrl] = useState<string | null>(null);

  //  Cargar la lista completa o filtrada de usuarios
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Si hay una URL de búsqueda activa, usamos esa; si no, traemos todos con GET /user
    const endpoint = searchUrl 
      ? `${import.meta.env.VITE_API_URL}/user/search/${encodeURIComponent(searchUrl)}`
      : `${import.meta.env.VITE_API_URL}/user`;

    fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        const data = await response.json();
        
        if (!response.ok) {
          setError(data.detail);
          setUsers([]);
          return;
        }
        
        setUsers(data);
      })
      .catch(() => {
        setError("Error de red al conectar con la API");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, searchUrl]);

  // 2. Cargar mi propio usuario
  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    const api = import.meta.env.VITE_API_URL;
    fetch(`${api}/user/me/id`, { headers })
      .then((response) => response.json())
      .then(({ id }) => fetch(`${api}/user/${id}`, { headers }))
      .then((response) => response.json())
      .then(setMe);
  }, [token]);

  // 3. Cargar detalle del usuario seleccionado
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

  // Manejador del formulario de búsqueda (Práctica 3)
  function handleSearch(e: SubmitEvent) {
    e.preventDefault();
    if (!searchText.trim()) return;
    setSearchUrl(searchText.trim());
  }

  // Manejador para limpiar la búsqueda y volver a la lista completa
  function handleClear() {
    setSearchText("");
    setSearchUrl(null);
  }

  if (loading && users.length === 0) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <h1>Hola, {me?.name}</h1>
      
      {/* Formulario de Búsqueda - Práctica 3 */}
      <form onSubmit={handleSearch} style={{ margin: '15px 0' }}>
        <input 
          type="text" 
          placeholder="Buscar por nombre..." 
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit" style={{ marginLeft: '5px' }}>Buscar</button>
        {searchUrl && (
          <button type="button" onClick={handleClear} style={{ marginLeft: '5px' }}>
            Limpiar
          </button>
        )}
      </form>

      <h2>Lista de Usuarios</h2>
      {users.length === 0 ? (
        <p>No se encontraron usuarios.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <button 
                onClick={() => setSelectedUserId(user.id)}
                style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
              >
                {user.name}
              </button>
            </li>
          ))}
        </ul>
      )}

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
