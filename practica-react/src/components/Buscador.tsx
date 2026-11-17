
import { useState } from 'react';

const LENGUAJES = [
  'JavaScript',
  'Python',
  'Java',
  'TypeScript',
  'C++',
  'C#',
  'Ruby',
  'Go',
  'PHP',
  'Swift',
];

export function Buscador() {
  const [busqueda, setBusqueda] = useState<string>('');

  // Filtramos la lista pasando ambos textos a minúsculas para ignorar mayúsculas/minúsculas
  const lenguajesFiltrados = LENGUAJES.filter((lenguaje) =>
    lenguaje.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '20px',
      borderRadius: '8px',
      width: '320px',
      margin: '0 auto',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', color: '#222', textAlign: 'center' }}>
        Buscador de Lenguajes
      </h3>

      <div style={{ marginBottom: '12px' }}>
        <input 
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar lenguaje..."
          style={{
            width: '100%',
            padding: '8px 10px',
            fontSize: '0.95rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>
        {lenguajesFiltrados.length} {lenguajesFiltrados.length === 1 ? 'resultado' : 'resultados'}
      </p>

      <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: '0' }}>
        {lenguajesFiltrados.map((lenguaje) => (
          <li key={lenguaje} style={{ marginBottom: '6px', color: '#333' }}>
            {lenguaje}
          </li>
        ))}
      </ul>
    </div>
  );
}