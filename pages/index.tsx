import { useState } from 'react'
import type { MouseEventHandler } from 'react'
import Head from 'next/head' 
import { LazyImage } from '@/components/RandomFox'

interface ImageItem {
  id: string,
  url: string
}

const randomNumber = (): number => Math.floor(Math.random() * 123) + 1
const generateId = (): string => Math.random().toString(36).substr(2, 9)

export default function Home() {
  const [images, setImages] = useState<ImageItem[]>([])

  const addNewFox: MouseEventHandler = (event) => {
    setImages([
      ...images,
      {id: generateId(), url: `https://randomfox.ca/images/${randomNumber()}.jpg`}
    ])
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-3xl font-bold underline">
          Hello Platzi!
          
          <button onClick={addNewFox}>Add Image</button>
          {images.map((image) => (
            <div key={image.id} className='p-4'>
              <LazyImage 
                src={image.url}
                // onLazyLoad={(node) => {console.log(node.src)}}  
              />
            </div>
          ))}

        </h1>
      </main>
    </>
  )
}
