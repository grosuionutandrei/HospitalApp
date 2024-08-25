import {useEffect, useState} from "react";
import {Diseases as Dis} from "../Api.ts";
import {apiClient} from "../apiClient.ts";
import {AxiosResponse} from "axios";
import {AddDisease} from "../components/AddDisease.tsx";

export function Diseases(){
   const [diseases,setDiseases] = useState<Dis[]>([]);
    useEffect(() => {
        apiClient.diseases.diseasesList().then((res:AxiosResponse<Dis[]>)=>{
            setDiseases(res.data);
        })
    }, []);

    return (
        <div className={'flex justify-between items-center flex-wrap border-2 border-blue-200 '}>
            <div className={'border-2 border-amber-950'}>
                <h1 className={'secondary_color text-color'}>Diseases</h1>
                <div className="overflow-x-auto overflow-y-auto max-h-96">
                    {diseases.length > 0 ? (
                        <table className="table table-lg">
                            <thead>
                            <tr className={'secondary_color text-color'}>
                                <th></th>
                                <th>Name</th>
                            </tr>
                            </thead>
                            <tbody>
                            {diseases.map((item, index) => {
                                const color: string = (index % 2 === 0) ? 'bg-green-100' : 'bg-green-200';
                                return (
                                    <tr key={index} className={`${color}`}>
                                        <th>{index}</th>
                                        <td>{item.name}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    ) : (
                        <p className={'secondary_color text-color'}>No diseases available.</p>
                    )}
                </div>
            </div>
            <div className={'fixed right-0 self-start'}>
                <AddDisease setDiseases={(disease)=>setDiseases([...diseases,disease])}/>
            </div>
        </div>
    )
}