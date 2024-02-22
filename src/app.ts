import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import handleErrorsMiddleware from "./middlewares/handleErrorsMiddleware";
import router from "./routers/index.js";

const app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(handleErrorsMiddleware);

export default app;
