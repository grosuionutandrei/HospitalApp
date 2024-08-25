import React, {useEffect, useState} from "react";
import {apiClient} from "../apiClient.ts";
import {AxiosResponse} from "axios";
import {Patients} from "../Api.ts";
import {Navigation} from "../components/Navigation.tsx";
import {NAVIGATION, NAVROUTE} from "../models/navigation.tsx";

import {Footer} from "../components/Footer.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {Diseases} from "./Diseases.tsx";
import{Patients as Pat} from './Patients.tsx';
import backgroundImage from "../resources/medical.jpg";
import {HeroMessage} from "../components/Hero.tsx";
import {PatientDetails} from "./PatientDetails.tsx";


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
                <div className="hero ">
                    <img src={backgroundImage}/>
                    <div className="hero-overlay bg-opacity-0"></div>
                    <div className="hero-content text-center">
                        <div className="max-w-full">
                            <Routes>
                                <Route path="/" element={<Navigate to="/home" replace/>}/>
                                <Route path="/home" element={<HeroMessage message={null} main_header={null} secondary_header={null}/>}/>
                                <Route path="/patients" element={<Pat/>}/>
                                <Route path={"/patients/:patientId"} element={<PatientDetails/>}/>
                                <Route path="/diseases" element={<Diseases/>}/>
                            </Routes>
                        </div>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    );
}