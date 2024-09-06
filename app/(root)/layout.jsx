import MobileHeader from '@/components/shared/MobileHeader';
import SideHeader from '@/components/shared/SideHeader';

const layout = ({ children }) => {
  return (
    <div className='flex flex-col lg:flex-row gap-4'>
      <SideHeader />
      <MobileHeader />
      {children}
    </div>
  )
}

export default layout