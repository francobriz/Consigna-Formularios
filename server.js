const server = require("express");
const path = require("path");
const app = server();
const PUERTO = 3003;
let users = [];

app.use(server.static(path.join(__dirname, "cliente")));

app.use(server.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "cliente/index.html"));
});

app.post("/login", function (req, res) {
  let usuario = req.body.usuario;
  let contraseña = req.body.contraseña;

  if (usuario === " " || contraseña === " " || !usuario || !contraseña) {
    console.log("usuario o contraseña vacios");
    res.sendFile(path.join(__dirname, "cliente/index.html"));
    return;
  }
  for (let i = 0; i < users.length; i = i + 2) {
    if (users[i] === usuario && users[i + 1] === contraseña) {
      res.sendFile(path.join(__dirname, "cliente/bienvenidx.html"));
      console.log(req.body);
      return;
    }
    res.sendFile(path.join(__dirname, "cliente/index.html"));
    console.log(req.body);
  }
});

app.get("/registro", function (req, res) {
  res.sendFile(path.join(__dirname, "cliente/registro.html"));
});

app.post("/registro", function (req, res) {
  let usuario = req.body.nuevoUsuario;
  let contraseña = req.body.nuevaContraseña;
  let repContraseña = req.body.repetirContraseña;

  if (
    usuario === " " ||
    contraseña === " " ||
    repContraseña === " " ||
    !usuario ||
    !contraseña ||
    !repContraseña
  ) {
    res.sendFile(path.join(__dirname, "cliente/registro.html"));
    return;
  }
  for (let i = 0; i < users.length; i = i + 2) {
    if (users[i] === usuario) {
      console.log("usuario ya existe");
      res.sendFile(path.join(__dirname, "cliente/registro.html"));
      return;
    }
  }

  if (contraseña === repContraseña) {
    users.push(usuario);
    users.push(contraseña);
    res.sendFile(path.join(__dirname, "cliente/index.html"));
    return;
  }
  res.sendFile(path.join(__dirname, "cliente/registro.html"));
});

app.listen(PUERTO, function () {
  console.log(`escuchando en puerto numero ${PUERTO}...`);
});
