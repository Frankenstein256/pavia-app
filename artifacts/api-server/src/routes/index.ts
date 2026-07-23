import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import freelancersRouter from "./freelancers";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(freelancersRouter);

export default router;
