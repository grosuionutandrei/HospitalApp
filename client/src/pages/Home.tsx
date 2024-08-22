import React, {useEffect, useState} from "react";
import {apiClient} from "../apiClient.ts";
import {AxiosResponse} from "axios";
import {Patients} from "../Api.ts";
import {Navigation} from "../components/Navigation.tsx";
import {NAVIGATION, NAVROUTE} from "../models/navigation.tsx";

import {Footer} from "../components/Footer.tsx";
import {Paradigm} from "../components/Paradigm.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {Diseases} from "./Diseases.tsx";
import{Patients as Pat} from './Patients.tsx';


export default function Home() {
    useEffect(() => {
        apiClient.patients.patientsList().then((result: AxiosResponse<Patients[]> )=> {
            console.log(result.data)
        })
    },[])

    return (
        <div className={'min-h-svh bg-accent flex-col justify-center items-stretch'}>
            <Navigation navTitles={NAVIGATION} location={NAVROUTE}></Navigation>
            <div className={'flex-grow'}>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<Paradigm />}/>
                    <Route path="/patients" element={<Pat />} />
                    <Route path="/diseases" element={<Diseases />} />
                </Routes>
            </div>
            <Footer/>
        </div>
    );
}