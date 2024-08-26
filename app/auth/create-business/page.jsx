"use client";

import InternationalPhoneInput from '@/components/shared/InternationalPhoneInput'
import { Button } from '@/components/ui/button'
import { Label } from "@/components/ui/label"
import ProcessingToast from '@/components/shared/ProcessingToast';

import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";


const page = () => {
  // const router = useRouter();

  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    address: '',
    phone: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setBusinessInfo(businessInfo => ({
      ...businessInfo,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    toast(<ProcessingToast />, {
      autoClose: false,
    });

    try {
      const response = await fetch('/api/business/add', {
        method: 'POST',
        body: JSON.stringify({
          ...businessInfo,
          phone: "+"+businessInfo.phone,
        }),
      });

      if(response.ok) {
        toast.dismiss();
        await signIn('google', { callbackUrl: '/dashboard' });
      } else {
        toast.dismiss();
        toast.error('Something went wrong, Try again later');
      }
    } catch(error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }

  }

  return (
    <div className='flex flex-col md:flex-row gap-8'>
      <h3 className='text-neutral-500 px-2'>Tell Us A Bit More About Your Business 💼</h3>
      <form 
        className='form'
        onSubmit={handleSubmit}
      >
        <Label className='label' htmlFor="name">Name </Label>
        <input 
          type='text' 
          value={businessInfo.name}
          name="name"
          id="name"
          onChange={handleChange}
          className='form_input'
          placeholder='business name'
          required
          pattern="[A-Za-z\s]+"
          minLength={2}
          title='Please enter only English letters'
        />

        <Label className='label' htmlFor="address">Address </Label>
        <input 
          type='text' 
          value={businessInfo.address}
          name="address"
          id="address"
          onChange={(e) => handleChange(e)}
          className='form_input'
          placeholder='business address'
          required
          minLength={3}
          pattern="[A-Za-z0-9\s]+"
          title='Please enter only English letters and numbers'
        />
        
        <InternationalPhoneInput 
          setBusinessInfo={setBusinessInfo}
          businessInfo={businessInfo}
        />

        <Button 
          type='submit'
          variant='outline'
          disabled={isSubmitting}
          className='mt-8 text-neutral-500 w-full'
        >
          Let's Go
        </Button>
      </form>

      <ToastContainer />
    </div>
  )
}

export default page