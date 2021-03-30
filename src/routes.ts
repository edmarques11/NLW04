import { Router } from "express";
import { Answercontroller } from "./controllers/AnswerController";
import { NpsController } from "./controllers/NpsController";
import { SendMailController } from "./controllers/SendMailController";
import { SurveysController } from "./controllers/SurveysController";
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();
const sendMailCotroller = new SendMailController();
const answerController = new Answercontroller();
const npsController = new NpsController();

// users
router.post("/users", userController.create);

// surveys
router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);

// sendMail
router.post("/sendMail", sendMailCotroller.execute);

// answers
router.get("/answers/:value", answerController.execute);

// nps
router.get("/nps/:survey_id", npsController.execute);

export { router };
