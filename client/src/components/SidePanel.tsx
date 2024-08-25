import {EditPatient} from "./EditPatient.tsx";
import {CreatePatient} from "./CreatePatient.tsx";

export function SidePanel(){
    return (
        <div  className={'fixed right-0 self-start'}>
            <CreatePatient/>
            <EditPatient/>
        </div>
    )

}