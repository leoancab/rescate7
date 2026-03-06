import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center">

      {/* idioma arriba izquierda */}
      <div className="absolute top-4 left-4">
        Español - Ecuador
      </div>

      {/* logo arriba derecha */}
      <img 
        src="/logo.png" 
        alt="Rescate7"
        className="absolute top-4 right-4 w-16"
      />
      <h1 className="text-red-500">TEST</h1>
      <h1 className="text-3xl font-bold mb-8">
        Plan de Rescate y
        <br />
        Renovación de la Fe
      </h1>
      <button className="bg-blue-500 text-white px-8 py-3 rounded-full mb-4">
        Tour
      </button>

      <Link to="/login">
        <button className="bg-white border px-8 py-3 rounded-full">
          Iniciar Sesión
        </button>
      </Link>

      <div className="flex gap-4 mt-10">
        <span>YouTube</span>
        <span>Facebook</span>
        <span>Instagram</span>
        <span>TikTok</span>
      </div>

      <footer className="absolute bottom-4 text-sm">
        Virtualweb del Ecuador S.A. <br />
        Todos los Derechos Reservados
      </footer>

    </div>
  )
}

export default Home