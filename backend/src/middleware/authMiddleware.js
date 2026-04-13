const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization;

    // 🔒 Validar que exista header
    if (!header) {
      return res.status(401).json({ message: "No autorizado: token requerido" });
    }

    // 🔒 Validar formato Bearer
    if (!header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Formato de token inválido" });
    }

    const token = header.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no definido");
    }

    // ✅ Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 Estructura clara del usuario
    req.user = {
      id: decoded.id,
      rol: decoded.rol,
      nom_usuario: decoded.nom_usuario,
      id_iglesia: decoded.id_iglesia
    };

    next();

  } catch (error) {
    console.error("Error JWT:", error.message);

    return res.status(401).json({
      message: "Token inválido o expirado"
    });
  }
}

module.exports = authMiddleware;