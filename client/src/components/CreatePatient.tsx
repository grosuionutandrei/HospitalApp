import {useAtom} from "jotai";
import {PatientsAtom} from "../atoms/PatientsAthom.tsx";
import {useState} from "react";
import {apiClient} from "../apiClient.ts";
import {AxiosResponse} from "axios";
import {Patients} from "../Api.ts";

export function CreatePatient(){
   const [getAllPatients,setAllPatients]=  useAtom(PatientsAtom);
   const [createdPatient,setCreatedPatient] =  useState('');
   let disabled:boolean = true;

   const createPatient = ()=>{
       apiClient.patients.patientsCreate(
           { name:  createdPatient },

       ).then((result: AxiosResponse<Patients[]>)=>{
           setAllPatients([...getAllPatients,result.data[0]])
       })

   } ;


    return (
        <div>
            <h3>Add Patient</h3>
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"/>
                </svg>
                <input  onChange={(e)=>{
                    disabled=e.target.value.length>0;
                    setCreatedPatient(e.target.value);
                }} type="text" className="grow" placeholder="Name"/>
            </label>
            <button disabled={!disabled} className={'btn btn-outline interest'} onClick={createPatient}>Create</button>
        </div>);
}