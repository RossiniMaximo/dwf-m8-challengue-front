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

What was i doing ?
I was cheking if the new API worked fine returning nearby lost pets. But heroku was throwing some service error.

The API calls are now working and now I'm going to work in the UI a little bit.
