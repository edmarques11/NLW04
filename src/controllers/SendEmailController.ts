import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";

class SendEmailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveyRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (!userAlreadyExists) {
      return response.status(400).json({ error: "User does not exists" });
    }

    const surveyAlreadyExists = await surveyRepository.findOne({
      id: survey_id,
    });

    if (!surveyAlreadyExists) {
      return response.status(400).json({ error: "Survey does not exists" });
    }

    // Save informations in the table surveyUser
    const surveyUser = surveysUsersRepository.create({
      user_id: userAlreadyExists.id,
      survey_id,
    });
    await surveysUsersRepository.save(surveyUser);
    // Send email for user
    return response.json(surveyUser);
  }
}

export { SendEmailController };
