import {Diseases} from "../Api.ts";
import {apiClient} from "../apiClient.ts";
import {AxiosResponse} from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import toast from "react-hot-toast";
import {Messages} from "../AppTextMessages/Messages.tsx";
import {useState} from "react";

export interface SetDiseases{
    setDiseases:(disease:Diseases)=>void
}


export function AddDisease({setDiseases}:SetDiseases){
    const [disease,setDisease]= useState<Diseases>({name:''});

    async  function createDisease(disease:Diseases){
      await apiClient.diseases.diseasesCreate({
          name:disease.name
      }).then((res:AxiosResponse<Diseases[]>)=>{
          setDiseases(res.data[0])
          setDisease({name:''})
          toast.success(`${Messages.SUCCESS} ${res.data[0].name}`);
      }).catch(error=>{
          console.log(error)
      })
    }


    return(
        <div>
            <h3 className={'text-black'}>Add Patient</h3>
            <label className="input input-bordered flex items-center gap-2">
                <input  onChange={(e)=>{
                   const newDisease:Diseases = {name:e.target.value}
                   setDisease(newDisease);
                }} type="text" className="grow" placeholder="Name" value={disease.name}/>
            </label>
            <button disabled={disease.name===''} className={'btn btn-outline interest'} onClick={()=>{createDisease(disease)}}>Create</button>
        </div>
    )
}