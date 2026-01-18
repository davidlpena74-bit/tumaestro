import Image from "next/image";

export default function Home() {
  return (
    <div className="container">
      <div className="grid-bg"></div>

      <main>
        <span className="badge">Estado: Configurando</span>
        <h1>TuMaestro.es</h1>
        <p>
          Estamos construyendo la nueva plataforma educativa.
          <br />
          La conexión con el servidor se ha realizado con éxito.
        </p>
      </main>

      <footer style={{ marginTop: '4rem', opacity: 0.6, fontSize: '0.9rem' }}>
        <p>© 2026 Tu Maestro - Próximamente</p>
      </footer>
    </div>
  );
}
