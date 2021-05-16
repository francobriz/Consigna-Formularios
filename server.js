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

  for (let i = 0; i < users.length; i = i + 2) {
    
    if (users[i] === req.body.usuario && users[i + 1] === req.body.contraseña) {
      res.sendFile(path.join(__dirname, "cliente/bienvenidx.html"));
      console.log(req.body);
    } else {
      res.sendFile(path.join(__dirname, "cliente/index.html"));
      console.log(req.body);
    }
  }
});

app.get("/registro", function (req, res) {
  res.sendFile(path.join(__dirname, "cliente/registro.html"));
});

app.post("/registro", function (req, res) {

  let usuario = req.body.nuevoUsuario;
  let contraseña = req.body.nuevaContraseña;
  let repContraseña = req.body.repetirContraseña;

  if (contraseña && repContraseña && usuario && contraseña === repContraseña) {
    users.push(usuario);

    users.push(contraseña);

    res.sendFile(path.join(__dirname, "cliente/index.html"));

  } else {
    res.sendFile(path.join(__dirname, "cliente/registro.html"));
  }
});

app.listen(PUERTO, function () {
  console.log(`escuchando en puerto numero ${PUERTO}...`);
});
