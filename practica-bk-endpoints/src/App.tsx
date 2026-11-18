import { useState, type SubmitEvent } from "react";
import { UserList } from "./components/UserList";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    setError(null);

    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.detail);
      return;
    }

    localStorage.setItem("token", data.token);
    setToken(data.token);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  function handleUnauthorized() {
    localStorage.removeItem("token");
    setToken(null);
    setError("Tu sesión venció");
  }

  if (token) {
    return (
      <>
        <button onClick={logout}>Salir</button>
        <UserList token={token} onUnauthorized={handleUnauthorized} />
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Ingresar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}