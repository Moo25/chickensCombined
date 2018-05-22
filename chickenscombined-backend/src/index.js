const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const api = require("./api");

const app = new Koa();
const router = new Router();

router.use("/api", api.routes()); // api route
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.listen(4000, () => {
  console.log("listenling to port 4000!");
});
