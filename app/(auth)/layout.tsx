import { auth } from '@/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

const Layout = async({children} : {children : ReactNode}) => {

  const session = await auth();

  if(session) redirect("/")
  return (
    <main className='auth-container '>
        <section className='auth-form'>
            <div className='auth-box'>
                <div className='flex flex-row gap-3'>
                <Image src='/icons/logo.svg' width={37} height={37} alt='logo'/>
                <h1 className='text-2xl font-semibold text-white'>BookTrack</h1>
                </div>
                <div>{children}</div>
            </div>
        </section>

        <section className='auth-illustration'>
            <Image src='/images/auth-illustration.png' width={1000} height={1000} className='size-full object-cover' alt='auth-illustration'/> 
        </section>
    </main>
  )
}

export default Layout