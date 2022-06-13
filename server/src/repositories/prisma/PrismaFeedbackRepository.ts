import { prisma } from "../../prisma";
import {
  FeedbackCreateData,
  FeedbacksRepository,
} from "../feedbacks-repository";

export class PrismaFeedbackRepository implements FeedbacksRepository {
  async create({ comment, type, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type: type,
        comment: comment,
        screenshot: screenshot,
      },
    });
  }
}
