
import { useState } from 'react';

export function PreguntaRespuesta() {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleRespuesta = () => {
    setVisible(!visible);
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
      <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', color: '#222' }}>
        ¿Qué es JSX?
      </h3>
      
      <button 
        onClick={toggleRespuesta}
        style={{
          padding: '8px 14px',
          cursor: 'pointer',
          backgroundColor: '#f0f0f0',
          color:'#110d0d',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontWeight: '500',
          marginBottom: visible ? '12px' : '0'
        }}
      >
        {visible ? 'Ocultar respuesta' : 'Mostrar respuesta'}
      </button>

      {visible && (
        <p style={{ 
          margin: '0', 
          color: '#555', 
          lineHeight: '1.4',
          fontSize: '0.95rem' 
        }}>
          Una sintaxis que permite escribir estructura parecida a HTML dentro de JavaScript. Se transforma en llamadas a funciones de [React](https://react.dev).
        </p>
      )}
    </div>
  );
}