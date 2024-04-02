import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import handleErrorsMiddleware from "./middlewares/handleErrorsMiddleware.js";
import router from "./routers/index.js";
import e2eRouter from "./routers/e2eTestsRouter.js";

const app = express();
app.use(json());
app.use(cors());

if (process.env.NODE_ENV === "test") {
  app.use(e2eRouter);
}
app.use(router);
app.use(handleErrorsMiddleware);

export default app;
