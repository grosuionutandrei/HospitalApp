
import { useAtom } from 'jotai';
import {EditPatientAtom} from "../atoms/EditAtom.tsx";
import {PatientsAtom} from "../atoms/PatientsAthom.tsx";
import {apiClient} from "../apiClient.ts";
import toast from "react-hot-toast";



export function EditPatient() {
    const [getPatientToEdit, setPatientToEdit] = useAtom(EditPatientAtom);
    const [getAllPatients, setPatients] = useAtom(PatientsAtom);
    let disabled:boolean = getPatientToEdit.name.length!==0;


    const saveEdit = () => {
         const previousValue = getAllPatients.find((item)=>item.id===getPatientToEdit.id);
         if(previousValue?.name===getPatientToEdit.name){
             toast.error("Value did not change")
             return;
         }

            apiClient.patients.patientsPartialUpdate(
                { name: getPatientToEdit.name },
                { id: 'eq.' + getPatientToEdit.id }
            ).then((response) => {
                console.log(response.data[0])
                const updatedPatients = getAllPatients.map((item) =>
                    item.id === getPatientToEdit.id ? { ...item, ...response.data[0] } : item
                );
                setPatients(updatedPatients);
                setPatientToEdit({ id: 0, name: '' });
                toast.success("Edit successful");
            }).catch((error) => {
                toast.error("Edit failed");
                console.error(error);
            });

    };
    return (
        <div className={' fixed right-0'}>
            <h3 className={'text-black'}>Edit Patient</h3>
            <label className="input flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"/>
                </svg>
                <input
                    type="text"
                    className="grow"
                    placeholder={"Name"}
                    value={getPatientToEdit.name}
                    onChange={(e) => {
                        setPatientToEdit({...getPatientToEdit, name: e.target.value})
                    }}
                />
            </label>
            <button disabled={!disabled} className={'btn btn-outline interest'} onClick={saveEdit}>Edit</button>
        </div>
    );
}
