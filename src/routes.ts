import { Router } from "express";
import { SendEmailController } from "./controllers/SendEmailController";
import { SurveysController } from "./controllers/SurveysController";
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();
const sendEmailCotroller = new SendEmailController();

router.post("/users", userController.create);

router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);

router.post("/sendMail", sendEmailCotroller.execute);

export { router };
