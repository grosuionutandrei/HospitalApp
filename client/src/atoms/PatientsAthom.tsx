import {atom} from "jotai";
import {Patients} from "../Api.ts";

export const PatientsAtom = atom<Patients[]>([])