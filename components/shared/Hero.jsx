import { heroAnnouncement } from '@/constants'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className='flex-col flex-center md:h-[90vh] p-4 gap-8 text-center'>
        <div className='text-xs border border-neutral-300 px-4 py-1 rounded-3xl shadow-sm'>
            {heroAnnouncement}
        </div>
        <h1 className='text-5xl font-semibold'>
            The easiest way to 
            <br /> 
              <span className='text-primary'>manage</span> 
            <br /> 
            your tour business inventory
        </h1>
        <h3 className='text-xl text-neutral-500 max-w-lg'>Very intutitive with no learning curve. Do a few clicks, and focus on running your business smoothly.</h3>
        <Link href="/auth/sign-in">
            <div className='bg-primary text-primary-foreground hover:bg-primary-hover 
            rounded-3xl px-6 py-2 font-medium shadow-md'>
                Get Started, It's Free
            </div>
        </Link>
    </section>
  )
}

export default Hero