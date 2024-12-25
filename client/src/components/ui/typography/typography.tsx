export function TypographyH1({children}) {
    return (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
           {children}
        </h1>
    )
}
export function TypographyH2({children}) {
    return (
        <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {children}
        </h2>
    )
}
export function TypographyH3({text}) {
    return (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {text}
        </h3>
    )
}
export function TypographyH4({text}) {
    return (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            v
        </h4>
    )
}
export function TypographyP({text}) {
    return (
        <p className="leading-7 [&:not(:first-child)]:mt-6">
            {text}
        </p>
    )
}
export function TypographyMuted({text}) {
    return (
        <p className="text-sm text-muted-foreground">{text}</p>
    )
}
