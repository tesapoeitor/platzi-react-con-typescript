interface Props {
    image: string,
    alt: string
}

export const RandomFox = ({ image, alt }: Props): JSX.Element => {
    return (
        <img 
            width={300} 
            height="auto" 
            src={image}
            alt={alt}
            className="mx-auto rounded-md bg-gray-300"
        />
    )
}