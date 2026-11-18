import { useCallback, useEffect, useState, type SubmitEvent } from "react";

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
  const [me, setMe] = useState<UserDetail | null>(null);

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUserDetail, setSelectedUserDetail] = useState<UserDetail | null>(null);

  // Práctica 3: Búsqueda
  const [searchText, setSearchText] = useState<string>("");
  const [searchUrl, setSearchUrl] = useState<string | null>(null);

  // Práctica 5: Estados del formulario de alta
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newCountryId, setNewCountryId] = useState("1");
  const [createError, setCreateError] = useState<string | null>(null);

  // Función reutilizable para cargar la lista
  const fetchUsers = useCallback(() => {
    setLoading(true);
    setError(null);

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

  // 1. Cargar lista al montar o cambiar búsqueda
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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

  // Manejadores de búsqueda (Práctica 3)
  function handleSearch(e: SubmitEvent) {
    e.preventDefault();
    if (!searchText.trim()) return;
    setSearchUrl(searchText.trim());
  }

  function handleClear() {
    setSearchText("");
    setSearchUrl(null);
  }

  // Manejador de alta de usuario (Práctica 5)
  async function handleCreateUser(e: SubmitEvent) {
    e.preventDefault();
    setCreateError(null);

    const body = {
      name: newName,
      age: Number(newAge),
      email: newEmail,
      password: newPassword,
      country_id: Number(newCountryId),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        // Por ejemplo, con sfer devuelve 403: "Missing permission: write_users"
        setCreateError(data.detail || "Error al crear el usuario");
        return;
      }

      // Limpiamos el formulario y refrescamos la lista sin recargar la página
      setNewName("");
      setNewAge("");
      setNewEmail("");
      setNewPassword("");
      setNewCountryId("1");
      fetchUsers();
    } catch {
      setCreateError("Error de conexión al intentar crear el usuario");
    }
  }

  if (loading && users.length === 0) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <h1>
        Hola, {me?.name} {me?.roles && `(${me.roles.map((r) => r.name).join(", ")})`}
      </h1>

      {/* Formulario de Alta - Práctica 5 */}
      <div style={{ margin: "20px 0", padding: "15px", border: "1px solid #ccc" }}>
        <h3>Nuevo Usuario</h3>
        <form onSubmit={handleCreateUser} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
          <input
            type="text"
            placeholder="Nombre"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Edad"
            value={newAge}
            onChange={(e) => setNewAge(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña (mín. 4 caracteres)"
            minLength={4}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <select value={newCountryId} onChange={(e) => setNewCountryId(e.target.value)}>
            <option value="1">Argentina</option>
            <option value="2">Brasil</option>
          </select>
          <button type="submit">Crear Usuario</button>
        </form>
        {createError && <p style={{ color: "red", marginTop: "10px" }}>{createError}</p>}
      </div>

      {/* Formulario de Búsqueda - Práctica 3 */}
      <form onSubmit={handleSearch} style={{ margin: "15px 0" }}>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit" style={{ marginLeft: "5px" }}>Buscar</button>
        {searchUrl && (
          <button type="button" onClick={handleClear} style={{ marginLeft: "5px" }}>
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
                style={{ background: "none", border: "none", color: "blue", cursor: "pointer", textDecoration: "underline", padding: 0 }}
              >
                {user.name}
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedUserDetail && (
        <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #ccc" }}>
          <h3>Detalle de: {selectedUserDetail.name}</h3>
          <p><strong>Email:</strong> {selectedUserDetail.email}</p>
          <p><strong>Edad:</strong> {selectedUserDetail.age}</p>
          <p><strong>País:</strong> {selectedUserDetail.country ? selectedUserDetail.country.name : "Sin país"}</p>
          <p><strong>Roles:</strong> {selectedUserDetail.roles.map((r) => r.name).join(", ") || "Ninguno"}</p>
        </div>
      )}
    </>
  );
}