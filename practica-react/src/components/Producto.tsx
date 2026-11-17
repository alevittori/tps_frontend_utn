// src/components/Producto.tsx

interface ProductoProps {
  nombre: string;
  precio: number;
  stock: number;
  oferta?: boolean; // Prop opcional del ejercicio 7
}

export function Producto({ nombre, precio, stock, oferta }: ProductoProps) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', width: '200px' }}>
      {oferta && <span style={{ color: 'red', fontWeight: 'bold' }}>¡Oferta!</span>}
      <h3>{nombre}</h3>
      <p>${precio}</p>
      <p>
        {stock === 0 ? (
          <span style={{ color: 'gray' }}>Sin stock</span>
        ) : (
          `Stock: ${stock} unidades`
        )}
      </p>
    </div>
  );
}