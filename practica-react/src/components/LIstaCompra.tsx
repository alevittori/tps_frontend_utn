
import { useState, type FormEvent } from 'react';

interface Item {
  id: number;
  texto: string;
}

export function ListaCompras() {
  const [items, setItems] = useState<Item[]>([]);
  const [nuevoTexto, setNuevoTexto] = useState<string>('');

  const agregarItem = (e: FormEvent) => {
    e.preventDefault();
    if (nuevoTexto.trim() === '') return; // Evita agregar ítems vacíos

    const nuevoItem: Item = {
      id: Date.now(),
      texto: nuevoTexto.trim(),
    };

    setItems([...items, nuevoItem]);
    setNuevoTexto(''); // Limpia el input
  };

  const eliminarItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

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
        Lista de compras
      </h3>

      <form onSubmit={agregarItem} style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
        <input 
          type="text"
          value={nuevoTexto}
          onChange={(e) => setNuevoTexto(e.target.value)}
          placeholder="Ej: yerba"
          style={{
            flex: '1',
            padding: '8px 10px',
            fontSize: '0.95rem',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button 
          type="submit"
          style={{
            padding: '8px 12px',
            cursor: 'pointer',
            backgroundColor: '#f0f0f0',
            color:'#0a0909',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontWeight: '500'
          }}
        >
          Agregar
        </button>
      </form>

      {items.length === 0 ? (
        <p style={{ color: '#777', fontStyle: 'italic', textAlign: 'center', margin: '15px 0' }}>
          No hay nada para comprar
        </p>
      ) : (
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: '0' }}>
          {items.map((item) => (
            <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span>{item.texto}</span>
              <button 
                onClick={() => eliminarItem(item.id)}
                style={{
                  padding: '4px 8px',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  color: '#d9534f'
                }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}