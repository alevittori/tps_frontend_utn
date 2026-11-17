
import { useState } from 'react';

export function Contador() {
  const [valor, setValor] = useState<number>(0);

  const incrementar = () => {
    if (valor < 10) setValor(valor + 1);
  };

  const decrementar = () => {
    if (valor > 0) setValor(valor - 1);
  };

  const reiniciar = () => setValor(0);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #ccc',
      padding: '20px',
      borderRadius: '8px',
      width: '280px',
      margin: '0 auto', // Centra la tarjeta horizontalmente en la pantalla
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      backgroundColor: '#fff'
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Contador</h3>
      <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 15px 0', color: '#222' }}>
        {valor}
      </p>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
        <button 
          onClick={decrementar} 
          disabled={valor === 0}
          style={{ padding: '8px 16px', cursor: valor === 0 ? 'not-allowed' : 'pointer' }}
        >
          -
        </button>
        <button 
          onClick={incrementar} 
          disabled={valor === 10}
          style={{ padding: '8px 16px', cursor: valor === 10 ? 'not-allowed' : 'pointer' }}
        >
          +
        </button>
        <button 
          onClick={reiniciar}
          style={{ padding: '8px 12px', cursor: 'pointer' }}
        >
          Reiniciar
        </button>
      </div>

      <div style={{ minHeight: '24px' }}>
        {valor === 10 && <span style={{ color: 'red', fontSize: '0.9rem', fontWeight: '500' }}>Llegaste al máximo</span>}
      </div>
    </div>
  );
}