import Image from "next/image"

const Navbar = () => {
    return (
        <nav className='sm:hidden flex'>
            <Image
                src="/icons/menu-burger.svg"
                alt='menu icon'
                width={24}
                height={24}
                className='object-contain cursor-pointer'
            />
        </nav>
    )
}

export default Navbar