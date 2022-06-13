import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

describe("test", () => {
  const createFeedBackSpy = jest.fn();
  const sendMailSpy = jest.fn();

  const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedBackSpy },
    { sendMail: sendMailSpy }
  );

  test("should be able to submit a feedback ", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64,test.jpg",
      })
    ).resolves.not.toThrow();

    expect(createFeedBackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  test("should not be able to submit a feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "example comment",
        screenshot: "data:image/png;base64,test.jpg",
      })
    ).rejects.toThrow();
  });

  test("should not be able to submit a feedback without coment", async () => {
    await expect(
      submitFeedback.execute({
        type: "dasd",
        comment: "",
        screenshot: "data:image/png;base64,test.jpg",
      })
    ).rejects.toThrow();
  });

  test("should not be able to submit a feedback with an invalid screenshot format", async () => {
    await expect(
      submitFeedback.execute({
        type: "dasd",
        comment: "qweqwe",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});
