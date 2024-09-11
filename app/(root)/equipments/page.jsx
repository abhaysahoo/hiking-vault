"use client";

import EquipmentForm from '@/components/shared/EquipmentForm';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import EquipmentTable from '@/components/shared/EquipmentTable';

const page = () => {

  return (
    <div className='lg:w-full bg-background m-4 rounded-lg p-2 sm:p-4'>
      <div className='flex-start flex-col gap-12'>
        <div className='flex items-center justify-between self-stretch'>
          <h4 className='text-neutral-600'>
            Equipments
          </h4>  
        </div>
        <div className='w-full'>
          <Tabs defaultValue="list" className="">
            <TabsList>
              <TabsTrigger value="list">Equipments List</TabsTrigger>
              <TabsTrigger value="add">Add an Equipment</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <EquipmentTable />
            </TabsContent>
            <TabsContent value="add">
              <EquipmentForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default page