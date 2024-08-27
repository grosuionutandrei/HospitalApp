import {EditPatient} from "./EditPatient.tsx";
import {CreatePatient} from "./CreatePatient.tsx";
import {Search, SearchEntities} from "./Search.tsx";

export function SidePanel(){
    return (
        <div  className={'fixed right-0 self-start'}>
            <Search entity={SearchEntities.PATIENTS}/>
            <CreatePatient/>
            <EditPatient/>

        </div>
    )

}