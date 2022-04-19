<!-- Esto va arriba de module.exports en webpack -->

/_ const dev = process.env.NODE_ENV === "development";
if (dev) {
LiveServer.start({
root: "./",
file: "index.html",
});
} _/

<!-- Dentro del module.exports va el watch dev que saque -->

module.exports = {
/_ watch: dev, _/

API CALLS URL :
https://dwf-m7-challengue.herokuapp.com

BACKEND CONF :
const allowedHosts = "https://dwf-m8-challenge.firebaseapp.com";
app.use(
cors({
origin: allowedHosts,
})
);

Things to fix :

A la hora de reportar mascotas no se porque se reportan varias veces, recién se reporto 3 veces xd, y también como que el botón de search de mapbox hace que se envié el reporte a la api (creo)

Maybe using a React reference on each button and react when it's clicked could fix this behavior.
