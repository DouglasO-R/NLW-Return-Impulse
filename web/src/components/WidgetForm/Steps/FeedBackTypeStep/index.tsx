import { feedbackType, feedbackTypes } from "../..";
import { ClosedButton } from "../../../ClosedButton";

type Props = {
    onFeedbackTypeChanged: (type: feedbackType) => void
}

export function FeedBackTypeStep({ onFeedbackTypeChanged }: Props) {
    return (
        <>

            <header>
                <span className="text-xl leading-6">Deixe seu feedback</span>
                <ClosedButton />
            </header>

            <div className="flex py-8 gap-2 w-full">
                {Object.entries(feedbackTypes).map(([key, value]) => (
                    <button
                        key={key}
                        className="bg-zinc-800 rounded-lg py-5 flex-1 flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none  "
                        onClick={() => onFeedbackTypeChanged(key as feedbackType)}
                        type="button"
                    >
                        <img src={value.image.source} alt={value.image.alt} />
                    </button>
                ))}
            </div>
        </>
    )
}