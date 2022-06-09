type ButtonProps = {
    text?: string,
}

export function Button({ text }: ButtonProps) {
    return (
        <>
            <button
                className="
                bg-violet-500 
                px-4 
                rounded 
                text-violet-100 
                hover:bg-violet-700"
            >
                {text ?? "Button"}</button>
        </>
    )
}