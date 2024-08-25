import {useEffect, useState} from "react";
import {apiClient} from "../apiClient.ts";
import axios, {AxiosResponse} from "axios";
import {useParams} from "react-router-dom";
import {Diseases} from "../Api.ts";
import toast from "react-hot-toast";

export interface AddDiagnosisResponse{
    diagnosis_date: string;
    diseases: {
        id?:number,
        name: string;
    };
}

interface Diagnosis{
    "patient_id": number,
    "disease_id": number,
    "diagnosis_date": string
}
interface AddDiagnosisFunction{
    addDiagnosis:(disease:AddDiagnosisResponse)=>void

}




export function AddDiagnosis({addDiagnosis}:AddDiagnosisFunction){
    const [disease,setDisease] = useState<Diseases[]>([]);
    const [selectedDisease,setSelectedDisease] = useState<Diagnosis|null>(null);
    const [disabled,setDisabled] =  useState(true);
    const {patientId}= useParams();


    // @ts-ignore
    async function createDiagnosis(diagnosis: Diagnosis|null): Promise<AddDiagnosisResponse> {
        try {
            const response: AxiosResponse<AddDiagnosisResponse> = await axios.post(
                'http://localhost:3000/diagnoses',
                diagnosis,
                {
                    params: {
                        select: 'diseases(id,name),diagnosis_date'
                    },
                    headers: {
                        'Prefer': 'return=representation'
                    }
                }
            );

            addDiagnosis({diagnosis_date:response.data[0].diagnosis_date.toString(),diseases:response.data[0].diseases})
            setSelectedDisease(null);
             toast.success(`Added the ${response.data[0].diseases.name}`)

        } catch (error) {
            console.log(diagnosis);

           toast.error(`Failed to add the ${selectedDisease}`);
           console.log(error)
        }
    }

    useEffect(() => {
        apiClient.diseases.diseasesList().then((response:AxiosResponse<Diseases[]>)=>
        { setDisease(response.data)})
    }, []);

     function getDiagnosis(diseaseId:string):Diagnosis{
         console.log(diseaseId);
         return {
             patient_id:parseInt(patientId as string),
             disease_id:parseInt(diseaseId),
             diagnosis_date:new Date().toISOString()
         }
     }

    return (
        <div>
            <h3 className={'text-black'}>Add Diagnosis</h3>
                <select
                    value={selectedDisease!==null ? selectedDisease.disease_id : ""}
                    onChange={(e)=>{
                    const diagnose:Diagnosis = getDiagnosis(e.target.value);
                    setSelectedDisease(diagnose);
                }} className="select  w-full max-w-xs">
                    <option value="" disabled>Select the disease</option>
                    {disease.map((item,index)=>{
                        const color: string = (index % 2 === 0) ? 'bg-green-100' : 'bg-green-200';
                        return (<option key={item.id} className={`${color}`} value={item.id}>{item.name}</option>)
                    })}
                </select>
            <button disabled={selectedDisease===null}  className={'btn btn-outline interest m-5'}  onClick={()=>createDiagnosis(selectedDisease)}>Add diagnose </button>
        </div>);
}