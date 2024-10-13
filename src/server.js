import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { env } from "./utils/env.js";

import notFoundHandler from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import logger from "../src/middlewares/loger.js";

import authRouter from "./routers/auth.js";
import contactsRouter from "./routers/contacts.js";
import { UPLOAD_DIR } from "./constants/index.js";

import { swaggerDocs } from './middlewares/swaggerDocs.js';


export const startServer = () => {
    const app = express();

    app.use(logger);
    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());

    app.use("/auth", authRouter);
    app.use("/contacts", contactsRouter);

    app.use('/uploads', express.static(UPLOAD_DIR));
    app.use('/api-docs', swaggerDocs());

    app.use(notFoundHandler);

    app.use(errorHandler);

    const port = Number(env("PORT", 3000));

    app.listen(port, () => console.log("Server running on port 3000"));
};