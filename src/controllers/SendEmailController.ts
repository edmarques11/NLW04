import { Request, Response } from "express";
import { resolve } from "path";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendEmailService from "../services/SendEmailService";

class SendEmailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveyRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      return response.status(400).json({ error: "User does not exists" });
    }

    const survey = await surveyRepository.findOne({
      id: survey_id,
    });

    if (!survey) {
      return response.status(400).json({ error: "Survey does not exists" });
    }

    // Save informations in the table surveyUser
    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id,
    });

    await surveysUsersRepository.save(surveyUser);

    // Send email for user
    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      user_id: user.id,
      link: process.env.URL_MAIL
    };

    await SendEmailService.execute(email, survey.title, variables, npsPath);

    return response.json(surveyUser);
  }
}

export { SendEmailController };
