import DataTable from "./DataTable";
import { columns } from "@/app/(root)/equipments/columns";
import { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";

const EquipmentTable = () => {
    const searchParams = useSearchParams(); // Use the hook to access search parameters
    const page = Number(searchParams.get('page')) || 1;
    const searchText = searchParams.get('query') || "";
    const [equipments, setEquipments] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchEquipments = async () => {
            try {
                const response = await fetch(`/api/equipment?page=${page}&query=${searchText}&limit=4`);
                const body = await response.json();

                if (response.ok) {
                    setEquipments(body.equipments);
                    setTotalPages(body.totalPages);
                } else {
                    throw new Error(body.message);
                }
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchEquipments();
    }, [page, searchText])

    return (
        <DataTable columns={columns} data={equipments} totalPages={totalPages} />
    )
}

export default EquipmentTable