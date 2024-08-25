import {AddDiagnosis} from "../components/AddDiagnosis.tsx";
import {useEffect, useState} from "react";
import {Diagnosis as Diag} from "./PatientDetails.tsx";
import {apiClient} from "../apiClient.ts";
import {Simulate} from "react-dom/test-utils";
import axios, {AxiosResponse} from "axios";
import {Diagnoses} from "../Api.ts";

export function Diagnosis(){
    const [diagnosis,setDiagnosis] = useState<Diag[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/diagnoses', {
            params: {
                order: 'patients(name)',
                select: 'patients(name),diseases(name),diagnosis_date'
            },
            headers: {
                'Accept': 'application/json',
                'Range-Unit': 'items'
            }
        })
            .then(response => {
                const diseases:Diag[] = response.data.map((item)=>{
                    return {
                        diagnosis_date:item.diagnosis_date,
                        patients:item.patients,
                        diseases:item.diseases
                    }
                })
                setDiagnosis([...diseases]);

            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);



    return (
        <div className={'flex justify-between items-center flex-wrap border-2 border-blue-200 '}>
            <div className={'border-2 border-amber-950'}>
                <h1 className={'secondary_color text-color'}>Diagnoses History</h1>
                <div className="overflow-x-auto overflow-y-auto max-h-96">
                    {diagnosis.length > 0 ? (
                        <table className="table table-lg">
                            <thead>
                            <tr className={'secondary_color text-color'}>
                                <th></th>
                                <th>Patient Name</th>
                                <th>Disease Name</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                            </thead>
                            <tbody>
                            {diagnosis.map((item, index) => {
                                const color: string = (index % 2 === 0) ? 'bg-green-100' : 'bg-green-200';
                                return (
                                    <tr key={index} className={`${color}`}>
                                        <th>{index}</th>
                                        <td>{item.patients.name}</td>
                                        <td>{item.diseases.name}</td>
                                        <td>{new Date(item.diagnosis_date).toLocaleDateString()}</td>
                                        <td>{new Date(item.diagnosis_date).toLocaleTimeString()}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    ) : (
                        <p className={'secondary_color text-color'}>No diagnosis available.</p>
                    )}
                </div>
            </div>
        </div>
    )


}