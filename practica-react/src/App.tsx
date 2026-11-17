import { useState } from 'react'
import { Producto } from './components/Producto';
import { Contador } from './components/Contador';
import { PreguntaRespuesta } from './components/PreguntaREspuesta';
import './App.css'
import { ConversorTemperatura } from './components/ConversonTemperatura';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Prácticas de React - Parte 1</h1>
      
      <section style={{ marginTop: '20px' }}>
        <h2>Ejercicios 1 y 7: Tarjetas de Producto</h2>
        <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
          <Producto nombre="Teclado" precio={45000} stock={12} oferta={true} />
          <Producto nombre="Mouse" precio={18000} stock={0} />
          <Producto nombre="Monitor" precio={320000} stock={3} />
        </div>
      </section>

      <hr style={{ margin: '30px 0' }} />

      <section>
        <h2>Ejercicio 2: Contador con límites</h2>
        <div>
          <Contador />
        </div>
      </section>

      <hr style={{ margin: '30px 0' }} />

      <section>
        <h2>Ejercicio 3: Mostrar y ocultar</h2>
        <PreguntaRespuesta />
      </section>

      <hr style={{ margin: '30px 0' }} />

      <section>
        <h2>Ejercicio 4: Conversor de temperatura</h2>
        <ConversorTemperatura />
      </section>
    </main>
  );
}

export default App




/*

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )

  */