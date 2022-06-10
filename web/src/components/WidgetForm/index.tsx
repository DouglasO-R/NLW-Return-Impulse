import { useState } from "react";

import bugImageUrl from "../../assets/images/Bug.svg";
import ideaImageUrl from "../../assets/images/Idea.svg";
import thoughtImageUrl from "../../assets/images/Thought.svg";


import { FeedBackContentStep } from "./Steps/FeedBackContentStep";
import { FeedBackSuccessStep } from "./Steps/FeedBackSuccessStep";
import { FeedBackTypeStep } from "./Steps/FeedBackTypeStep";





export const feedbackTypes = {
    BUG: {
        title: "Problema",
        image: {
            source: bugImageUrl,
            alt: "imagem de inseto"
        },
    },
    IDEA: {
        title: "Ideia",
        image: {
            source: ideaImageUrl,
            alt: "imagem de lampada"
        },
    },
    OTHER: {
        title: "Outro",
        image: {
            source: thoughtImageUrl,
            alt: "imagem de balao de pensamento"
        },
    },
}

export type feedbackType = keyof typeof feedbackTypes;

export function WidgetFrom() {
    const [feedbackType, setFeedbackType] = useState<feedbackType | null>(null);
    const [feedBackSent, setFeedBackSent] = useState(false);

    function handleRestartFeedBack() {
        setFeedbackType(null);
        setFeedBackSent(false)
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center  shadow-lg w-[calc(100vw-2rem)] md:w-auto">


            {feedBackSent ? (
                <FeedBackSuccessStep onFeedBackRestartRequest={handleRestartFeedBack}/>
            ) : (
                <>
                    {!feedbackType ? (
                        <FeedBackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                    ) : (
                        < FeedBackContentStep
                            feedbackType={feedbackType}
                            onFeedBackRestartRequest={handleRestartFeedBack}
                            onFeedBackSent={() => setFeedBackSent(true)}
                        />
                    )}
                </>
            )}

            <footer className="text-xs text-neutral-400">

                Feito com amor <a href="" className="underline underline-offset-2">Douglas Oliveira</a>
            </footer>
        </div>
    );
}