import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import {Toaster} from "react-hot-toast";
import Home from "../pages/Home.tsx";
import {DevTools} from "jotai-devtools";

import {useAtom} from "jotai";
import {ThemeAtom} from "../atoms/ThemeAtom.tsx";
import {Patients} from "../pages/Patients.tsx";
import {Diseases} from "../pages/Diseases.tsx";
import ThemeSwitcher from "./ThemeSwitcher.tsx";


const App = () => {

    const [theme, setTheme] = useAtom(ThemeAtom);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme])

    return (<>

        <Toaster/>
        <Home/>


    </>)
}
export default App;