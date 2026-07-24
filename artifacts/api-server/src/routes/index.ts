import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import freelancersRouter from "./freelancers";
import propertiesRouter from "./properties";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(freelancersRouter);
router.use(propertiesRouter);

export default router;
