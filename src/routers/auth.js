import { Router } from "express";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import {
    loginUserSchema,
    loginWithGoogleOAuthSchema,
    registerUserSchema,
    requestResetEmailSchema,
    resetPasswordSchema
} from "../validation/auth.js";
import {
    loginController,
    logoutController,
    refreshController,
    registerController,
    requestResetEmailController,
    resetPasswordController,
    getGoogleOAuthUrlController,
    loginWithGoogleController
} from "../controllers/auth.js";

const router = Router();

router.post(
    '/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerController),
);
router.post(
    '/login',
    validateBody(loginUserSchema),
    ctrlWrapper(loginController),
);
router.post(
    '/logout',
    ctrlWrapper(logoutController),
);
router.post(
    '/refresh',
    ctrlWrapper(refreshController)
);
router.post(
    "/send-reset-email",
    validateBody(requestResetEmailSchema),
    ctrlWrapper(requestResetEmailController),
);
router.post(
    "/reset-pwd",
    validateBody(resetPasswordSchema),
    ctrlWrapper(resetPasswordController)
);
router.get(
    "/get-oauth-url",
    ctrlWrapper(getGoogleOAuthUrlController),
);
router.post(
    "/confirm-oauth",
    validateBody(loginWithGoogleOAuthSchema),
    ctrlWrapper(loginWithGoogleController)
);
export default router;