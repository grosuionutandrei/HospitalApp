import {useEffect} from "react";
import {apiClient} from "../apiClient.ts";
import {AxiosResponse} from "axios";
import {Patients as Pat} from "../Api.ts";
import {useAtom} from "jotai";
import {PatientsAtom} from "../atoms/PatientsAthom.tsx";
import {EditButton} from "../components/EditButton.tsx";
import {SidePanel} from "../components/SidePanel.tsx";
import {DeleteButton} from "../components/DeleteButton.tsx";
import {useNavigate} from "react-router-dom";

export function Patients() {
    const [getPatients, setPatients] = useAtom(PatientsAtom);
    useEffect(() => {
        apiClient.patients.patientsList().then((result: AxiosResponse<Pat[]>) => {
            setPatients(result.data);
        })
    }, [])

    const deletePatient = (id: string, name: string) => {
        apiClient.patients.patientsDelete({id: 'eq.' + id, name: 'eq.' + name}).then((response) => {

            setPatients(getPatients.filter((patient) => patient.id !== parseInt(id) && patient.name !== name))
        })
    }
    const navigate = useNavigate();


    return (
        <div className={'flex justify-between items-center flex-wrap border-2 border-blue-200 '}>
            <div className="overflow-x-auto overflow-y-auto max-h-96">
                <table className="table table-lg table-pin-rows secondary_color ">
                    <thead>
                    <tr>
                        <th className={'text-color'}></th>
                        <td>Name</td>
                        <td>Edit</td>
                        <td>Delete</td>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        getPatients.map((item, index) => {

                            const color: string = (index % 2 === 0) ? 'bg-green-100' : 'bg-green-200'
                            return (
                                <tr key={item.id} className={`${color}`}>
                                    <th>{index + 1}</th>
                                    <td className={'text-black'}>
                                        <button className="btn btn-outline interest text-color"
                                                onClick={() => navigate(`/patients/${item.id}`)}>
                                            {item.name}
                                        </button>
                                    </td>
                                    <td>
                                        <EditButton id={item.id} name={item.name}/>
                                    </td>
                                    <td>
                                        <DeleteButton id={item.id} name={item.name} deleteOperation={deletePatient}/>
                                    </td>
                                    <th>{index + 1}</th>
                                </tr>)
                        })
                    }
                    </tbody>
                    <tfoot>
                    </tfoot>
                </table>
            </div>
            <SidePanel/>
        </div>
    )


}