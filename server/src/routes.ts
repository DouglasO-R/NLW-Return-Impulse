import { Router } from "express";
import { NodemailerMailAdapter } from "./adapter/nodemailer/nodemailer-mail-adapter";

import { prisma } from "./prisma";
import { PrismaFeedbackRepository } from "./repositories/prisma/PrismaFeedbackRepository";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";

export const routes = Router();

routes.post("/", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedBackRepository = new PrismaFeedbackRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedBackRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackUseCase.execute({ type, comment, screenshot });

  return res.status(201).send();
});
