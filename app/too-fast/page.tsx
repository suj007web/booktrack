import React from 'react'

const page = () => {
  return (
    <main className='root-container flex min-h-screen flex-col items-center justify-center'>    
        <h1 className='font-bebas-neue text-5xl font-bold text-light-100'>Too Many Request !</h1>
        <p className='mt-3 max-w-xl text-center text-light-400'>
            Try again after some time
        </p>
    </main>
  )
}

export default page