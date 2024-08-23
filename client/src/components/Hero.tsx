import {Messages} from "../AppTextMessages/Messages.tsx";

export interface Message{
    main_header?:string|null
    secondary_header?:string|null
    message?:string|null

}

export function HeroMessage({message,main_header,secondary_header}:Message){

    return(
     <>
        <h1 className="mb-5 text-5xl font-bold title-color ">{main_header!==null?message:Messages.MAIN_HEADER}</h1>
        <h2 className="mb-5 text-3xl font-bold title-color">{secondary_header!==null?secondary_header:Messages.SEC_HEADER}</h2>
        <p className="mb-5 hero-manifest">
            {message!==null?message:Messages.DEFAULT_HERO}
        </p>
    </>
    )
}