import Link from 'next/link'

import { Button } from '../ui/button'
import Navbar from './Navbar'

const Header = () => {
    return (
        <section className='bg-transparent'>
            <div className='wrapper bg-transparent'>
                <div className='flex-between'>
                    {/* add a logo */}
                    <Link href="/">
                        <div className='text-2xl text-brand-600 font-extrabold'>
                            Hiking<span className='text-brand-800 tracking-tighter uppercase'>Vault</span>
                        </div>
                    </Link>

                    <nav className='hidden sm:flex flex-start gap-8'>
                        <Link href="#pricing">
                            <div className='text-primary font-bold text-xl 
                        hover:text-primary-hover hover:border-b-2 border-primary-hover'>
                                Pricing
                            </div>
                        </Link>
                        <Link href="/auth/sign-in">
                            <div className='bg-primary text-primary-foreground hover:bg-primary-hover 
                            rounded-3xl px-6 py-2 font-medium shadow-md'>
                                Get Started
                            </div>
                        </Link>
                    </nav>
                    <Navbar />
                </div>
            </div>
        </section>
    )
}

export default Header