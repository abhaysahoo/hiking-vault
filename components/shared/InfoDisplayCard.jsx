import Image from "next/image"

import {
    Card,
    CardContent,
} from "@/components/ui/card"

const InfoDisplayCard = ({ text }) => {
  return (
      <Card className='border-none overflow-hidden rounded-lg'>
          <CardContent className='bg-teal-100 text-teal-600 flex items-start gap-2 py-4 px-2'>
              <Image
                  src='/icons/information-circle.svg'
                  alt="info circle"
                  width={20}
                  height={20}
              />
              <p className="text-sm">{text}</p>
          </CardContent>
      </Card>
  )
}

export default InfoDisplayCard