import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";

import { feedbackType, feedbackTypes } from "../..";
import { api } from "../../../../lib/api";
import { ClosedButton } from "../../../ClosedButton";
import { Loading } from "../../../Loading";
import { ScreenShotButton } from "../../ScreenShotButton";


type Props = {
    feedbackType: feedbackType,
    onFeedBackRestartRequest: () => void,
    onFeedBackSent: () => void
}
export function FeedBackContentStep({ feedbackType, onFeedBackRestartRequest, onFeedBackSent }: Props) {
    const [comment, setComment] = useState('');
    const [screenShot, setScreenShot] = useState<string | null>(null);
    const [isSendingFeedBack, setIsSendingFeedBack] = useState(false);
    const feedbackInfo = feedbackTypes[feedbackType];


    async function handleSubmitFeedBack(e: FormEvent) {
        e.preventDefault()
        setIsSendingFeedBack(true);

        await api.post("/feedbacks", {
            type: feedbackType,
            comment,
            screenshot:screenShot,
        })

        setIsSendingFeedBack(false);
        onFeedBackSent();
    }

    return (
        <>

            <header>
                <button type="button" className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100" onClick={onFeedBackRestartRequest}>
                    < ArrowLeft />
                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedbackInfo.image.source} alt={feedbackInfo.image.alt} className="w-6 h-6" />
                    {feedbackInfo.title}
                </span>
                <ClosedButton />
            </header>

            <form onSubmit={handleSubmitFeedBack} className="my-4 w-full">
                <textarea
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 
                focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte um detalhe o que esta acontecendo"
                    onChange={(event) => setComment(event.target.value)}
                />

                <footer className="flex gap-2 mt-2">
                    <ScreenShotButton
                        screenShot={screenShot}
                        onScreenShotTook={setScreenShot}
                    />

                    <button
                        disabled={comment.length === 0 || isSendingFeedBack}
                        className="p-2 bg-brand-500 rounded-md border-transparent flex flex-1 justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2
                        focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                        type="submit"
                    >
                        {isSendingFeedBack ? <Loading /> : "Enviar Feedback"}
                    </button>
                </footer>

            </form>
        </>
    )
}