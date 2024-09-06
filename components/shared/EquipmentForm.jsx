"use client";

import ImageUploader from './ImageUploader'
import { Button } from '@/components/ui/button'
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EquipmentForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    image: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/equipment', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if(!response.ok) {
        const { message } = await response.json();
        console.log(message);
        throw new Error(message);
      }

      console.log('Equipment added successfully'); 
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    } finally {
      setIsSubmitting(false);
      toast.success('Equipment added successfully');
      setTimeout(() => {
        router.push('/equipments');
      }, 1000);    
    }
  }

  const handleChange = (e) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <>
      <ScrollArea className='lg:h-[60vh] max-w-sm rounded-md border p-4'>
        <form
          className='form gap-4'
          onSubmit={handleSubmit}
        >
          <div className='form_input_label_wrapper'>
            <Label className='label' htmlFor="name">Name </Label>
            <input
              type='text'
              value={formData.name}
              name="name"
              id="name"
              onChange={handleChange}
              className='form_input'
              placeholder='Equipment name'
              required
              pattern="[A-Za-z0-9\s]+"
              minLength={2}
              title='Please enter only English letters & digits'
            />
          </div>

          <div className='form_input_label_wrapper'>
            <Label className='label' htmlFor="category">Category </Label>
            <input
              type='text'
              value={formData.category}
              name="category"
              id="category"
              onChange={handleChange}
              className='form_input'
              placeholder={`e.g. 'hiking shoes', 'jacket', 'rain cover', 'gloves'`}
              required
              pattern="[A-Za-z\s]+"
              minLength={2}
              title='Please enter only English letters'
            />
          </div>
          
          <div className='form_input_label_wrapper'>
            <Label className='label' htmlFor="image">Image </Label>
            <ImageUploader 
              setFormData={setFormData}
            />
          </div>

          {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

          <Button
            type='submit'
            disabled={isSubmitting}
            className='mt-8 hover:bg-primary-hover w-full'
          >
            {isSubmitting? 'Adding...' : 'Add'}
          </Button>
        </form>
      </ScrollArea>
      <ToastContainer />
    </>
  )
}

export default EquipmentForm