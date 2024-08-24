import {Patients} from "../Api.ts";
import {atom} from "jotai";



export const EditPatientAtom = atom<Patients>({id:0,name:""})
