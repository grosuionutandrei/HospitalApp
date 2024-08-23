import {useEffect} from "react";
import {apiClient} from "../apiClient.ts";
import {AxiosResponse} from "axios";
import {Patients as Pat} from "../Api.ts";
import {useAtom} from "jotai";
import {PatientsAtom} from "../atoms/PatientsAthom.tsx";

export function Patients() {
    const [getPatients, setPatients] = useAtom(PatientsAtom);
    useEffect(() => {
        apiClient.patients.patientsList().then((result: AxiosResponse<Pat[]>) => {
            setPatients(result.data);
            console.log(result.data)
        })
    }, [])


    return (
        <>
        <div className="overflow-x-auto">
            <table className="table table-xs table-pin-rows table-pin-cols">
                <thead>
                <tr>
                    <th></th>
                    <td>Name</td>
                    <td>Action</td>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    getPatients.map((item, index) => {

                        const color: string = (index+1 % 2 === 0) ? '.bg-green-100' : '.bg-green-400'
                        return (
                            <tr key={item.id} className={`${color}`}>
                                <th>{index + 1}</th>
                                <td>{item.name}</td>
                                <th>{index + 1}</th>
                            </tr>)
                    })
                }
                </tbody>
                <tfoot>
                </tfoot>
            </table>
        </div>
            </>
    )


}