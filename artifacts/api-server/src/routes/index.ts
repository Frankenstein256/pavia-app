import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import freelancersRouter from "./freelancers";
import propertiesRouter from "./properties";
import coursesRouter from "./courses";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(freelancersRouter);
router.use(propertiesRouter);
router.use(coursesRouter);

export default router;
