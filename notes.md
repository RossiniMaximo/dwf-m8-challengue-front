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

Travelling to login being already logged in. (done).
Local storage not updating the data on refresh.(done).
Disappear the pet card when deleted.(done)
Unexpected token.
