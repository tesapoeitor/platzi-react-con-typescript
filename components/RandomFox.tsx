import { useEffect, useRef, useState } from 'react'
import type { ImgHTMLAttributes } from 'react'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
    src: string,
    onLazyLoad?: (img: HTMLImageElement) => void // esta función se ejecuta cuando la imagen se carga
}

export const LazyImage = ({ src, onLazyLoad, ...imgProps }: Props): JSX.Element => {
    const node = useRef<HTMLImageElement>(null)
    const [currentSrc, setCurrentSrc] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=")

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting) {
                    console.log("Hey")
                    setCurrentSrc(src)

                    if(node.current) {
                        onLazyLoad && onLazyLoad(node.current)
                        observer.disconnect()
                    }
                }
            })
        })

        if(node.current) {
            observer.observe(node.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [src, onLazyLoad])

    return (
        <img
            ref={node}
            width={300} 
            height="auto" 
            src={currentSrc}
            {...imgProps}
            className="mx-auto rounded-md bg-gray-300"
        />
    )
}