import { MailAdapter } from "../adapter/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private repository: FeedbacksRepository,
    private mailAdapter:MailAdapter
    ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if(!type){
      throw new Error("Type is required")
    }

    if(!comment){
      throw new Error("Type is required")
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error("Invalid screenshot format");
    }


    await this.repository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject:"NOvo feedbakcl",
      body:[
        `<div style="font-family:sans-serif;font-size: 16px; color:#111">`,
        `<p>tipo feedback ${type}</p>`,
        `<p>Comentario ${comment}</p>`,
        `</div>`,
      ].join("\n")
    })
  }
}