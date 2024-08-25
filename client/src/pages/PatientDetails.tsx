import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";


import {AddDiagnosis, AddDiagnosisResponse} from "../components/AddDiagnosis.tsx";
export interface Diagnosis {
    diagnosis_date: Date;
    patients: {
        name: string;
    };
    diseases: {
        name: string;
    };
}


export function PatientDetails(){
    const {patientId}= useParams();
    const [currentDiagnoses,setCurrentDiagnoses] =  useState<Diagnosis[]>([]);


    useEffect(() => {
        axios.get('http://localhost:3000/diagnoses', {
            params: {
                patient_id: `eq.${patientId}`,
                select: 'patients(name),diseases(name),diagnosis_date'
            },
            headers: {
                'Accept': 'application/json',
                'Range-Unit': 'items'
            }
        })
            .then(response => {
         const diseases:Diagnosis[] = response.data.map((item)=>{
             return {
                 diagnosis_date:item.diagnosis_date,
                 patients:item.patients,
                 diseases:item.diseases
             }
         })
                setCurrentDiagnoses([...diseases]);
       console.log(diseases[0].patients.name);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [patientId]);


    function extractDiagnose(disease:AddDiagnosisResponse){
        const diagnose = {
             diagnosis_date:new Date(disease.diagnosis_date),
             patients: {name:currentDiagnoses.length > 0 ? currentDiagnoses[0].patients.name : "No patient data available"},
             diseases: {
                 name: disease.diseases.name
             }
         }
         setCurrentDiagnoses([...currentDiagnoses,diagnose])
    }


    return (
        <div className={'flex justify-between items-center flex-wrap border-2 border-blue-200 '}>
            <div className={'border-2 border-amber-950'}>
            <h1 className={'secondary_color text-color'}>Patient Details</h1>
            <h2 className={'secondary_color text-color'}>{currentDiagnoses.length > 0 ? currentDiagnoses[0].patients.name : "No patient data available"}</h2>
            <div className="overflow-x-auto overflow-y-auto max-h-96">
                {currentDiagnoses.length > 0 ? (
                    <table className="table table-lg">
                        <thead>
                        <tr className={'secondary_color text-color'}>
                            <th></th>
                            <th>Disease Name</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentDiagnoses.map((item, index) => {
                            const color: string = (index % 2 === 0) ? 'bg-green-100' : 'bg-green-200';
                            return (
                                <tr key={index} className={`${color}`}>
                                    <th>{index}</th>
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
            <div className={'fixed right-0 self-start'}>
             <AddDiagnosis addDiagnosis={(disease)=>{extractDiagnose(disease)}}/>
            </div>
        </div>
    );



}