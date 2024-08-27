import {useEffect, useState} from "react";
import {Diagnoses, Diseases, Patients} from "../Api.ts";
import axios, {AxiosResponse} from "axios";
import {apiClient} from "../apiClient.ts";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;



export enum SearchEntities {
    PATIENTS="patients", DISEASES="diseases", DIAGNOSIS='diagnosis'
}

export interface Entity{
    entity:SearchEntities
}

export function Search({entity}:Entity){
const [results,setResults] = useState<Patients[]|Diagnoses[]|Diseases[]> ([]);
const [value,setUserValue] = useState<string>('');



    return(
        <>
            <label className="input input-bordered flex items-center gap-2">

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"/>
                </svg>
                <input onChange={(e) => {
                    const value: string = e.target.value;
                    setUserValue(value);
                }} type="text" className="grow" placeholder="Search"/>
            </label>
            <button onClick={(e) => {
                searchForEntity(value, entity, results)
            }}>Search
            </button>
        </>
    )
}


function searchForEntity(value: string, entity: SearchEntities, results: Patients[]|Diagnoses[]|Diseases[]){
   switch (entity){
       case SearchEntities.PATIENTS:searchPatientsTable(value,results);
       break;
   }
}

 async function searchPatientsTable(value:string,results:Patients[]|Diagnoses[]|Diseases[]){
    await apiClient.patients.patientsList({
        name:`like.*${value}*`
    }).then((res:AxiosResponse<Patients[]>)=>{
        console.log(res.data);
    }).catch((error)=>
    console.log(error)
    )
}


