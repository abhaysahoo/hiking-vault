"use client";

import { usePathname } from 'next/navigation'
import EquipmentForm from '@/components/shared/EquipmentForm';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import DataTable from '@/components/shared/DataTable';
import { columns } from './columns';
import { useState, useEffect } from 'react';

const page = () => {
  const pathName = usePathname();
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch('/api/equipment');
        const body = await response.json();

        if(response.ok) {
          console.log('Equipments fetched succesfully'); 
          setEquipments(body.allEquipments);
        } else {
          throw new Error(body.message);
        }
      } catch(error) {
        console.error(error.message);
      }
    }

    fetchEquipments();
  }, [])

  return (
    <div className='lg:w-full bg-background m-4 rounded-lg p-2 sm:p-4'>
      <div className='flex-start flex-col gap-12'>
        <div className='flex items-center justify-between self-stretch'>
          <h4 className='text-neutral-600'>
            {pathName.slice(1).toUpperCase()}
          </h4>  
        </div>
        <div className='w-full'>
          <Tabs defaultValue="list" className="">
            <TabsList>
              <TabsTrigger value="list">Equipments List</TabsTrigger>
              <TabsTrigger value="add">Add an Equipment</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <DataTable columns={columns} data={equipments} />
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