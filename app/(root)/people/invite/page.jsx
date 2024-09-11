"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import InfoDisplayCard from "@/components/shared/InfoDisplayCard"
import { emailInvitationDisplayMessage } from "@/constants"
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react"
import ProcessingToast from "@/components/shared/ProcessingToast";


const page = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    toast(<ProcessingToast />, {
      autoClose: false,
    });

    try {
      const response = await fetch('/api/people/invite', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      const { message } = await response.json();

      if (!response.ok) {
        throw new Error(message);
      }

      console.log(message);
      toast.dismiss();
      toast.success(message);
      
    } catch (error) {
      console.error(error.message);
      toast.dismiss();
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
      setEmail('');  
    }
  }
  
  return (
    <div className="flex flex-col items-start gap-4 pt-8">
      <div>
        <InfoDisplayCard text={emailInvitationDisplayMessage}/>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle className='text-primary'>Send an Invitation</CardTitle>
            <CardDescription>Enter recepient's email</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="sm:min-w-72 md:min-w-96" onSubmit={handleSubmit}>
              <input
                type='email'
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className='form_input'
                placeholder='email'
                required
              />

              <Button
                type='submit'
                disabled={isSubmitting}
                className='mt-8 hover:bg-primary-hover w-full'
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <ToastContainer />
    </div>
  )
}

export default page