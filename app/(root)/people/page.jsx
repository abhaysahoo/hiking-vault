"use client";

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/people/invite');
  }, [router])

  return null;
}

export default page