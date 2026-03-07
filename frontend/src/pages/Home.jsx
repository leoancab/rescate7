import { Link } from "react-router-dom"

function Home() {
  return (
    <div>

      {/* idioma arriba izquierda */}
      <div>
        Español - Ecuador
      </div>

      {/* logo arriba derecha */}
      <img
        src="/logo.png"
        alt="Rescate7"
        class="titulo"
      />
      <h1 class="titulo">
        Plan de Rescate y
        <br />
        Renovación de la Fe
      </h1>
      <div class="contenedor">
        <Link to="/tour">
          <button className="bg-blue-500 text-white px-8 py-3 rounded-full mb-4">
            Tour
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-white border px-8 py-3 rounded-full">
            Iniciar Sesión
          </button>
        </Link>
      </div>
      <div class="contenedorlinks">
        <img class="links" src="/youtube.png" />
        <img class="links" src="facebook.png" />
        <img class="links" src="instagram.png" />
        <img class="links" src="tiktok.png" />
      </div>

      <footer className="absolute bottom-4 text-sm">
        Virtualweb del Ecuador S.A. <br />
        Todos los Derechos Reservados
      </footer>

    </div>
  )
}

export default Home