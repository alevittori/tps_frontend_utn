
import { useState } from 'react';

export function ConversorTemperatura() {
  const [celsius, setCelsius] = useState<string>('');

  // Convertimos el texto del input a número (si está vacío o es inválido, manejamos 0)
  const cNum = celsius === '' ? NaN : Number(celsius);
  
  // Fórmula: F = C * 9/5 + 32
  const fahrenheit = !isNaN(cNum) ? (cNum * 9) / 5 + 32 : null;

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '20px',
      borderRadius: '8px',
      width: '280px',
      margin: '0 auto',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      textAlign: 'center'
    }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', color: '#222' }}>
        Conversor de C° a F°
      </h3>
      
      <div style={{ marginBottom: '15px' }}>
        <input 
          type="number"
          value={celsius}
          onChange={(e) => setCelsius(e.target.value)}
          placeholder="Ingrese °C"
          style={{
            padding: '8px 12px',
            width: '80%',
            fontSize: '1rem',
            textAlign: 'center',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      {fahrenheit !== null && (
        <div>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 8px 0', color: '#222' }}>
            {fahrenheit.toFixed(1)} °F
          </p>
          
          <div style={{ minHeight: '24px' }}>
            {cNum > 30 && (
              <span style={{ color: '#d9534f', fontWeight: '600', fontSize: '0.95rem' }}>
                Hace calor
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}