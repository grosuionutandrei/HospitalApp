import {useNavigate} from "react-router-dom";
import React from "react";

export interface NavTitles<T>{
    navTitles:T[];
    location:T[];
}

export function Navigation({navTitles,location}:NavTitles<string>){
 const navigate = useNavigate();
    return (
    <div className="navbar bg-base-100 secondary_color">
        <div className="flex-auto navbar-start">
            <h1 className="menu-title text-5xl  text-color">The Hospital App</h1>
        </div>
        <div className={"navbar-end  flex-auto"}>
            <ul className="menu menu-horizontal px-1">
                             {navTitles.map((item, index) => {
                                return (
                                    <li className={ 'btn btn-ghost  m-5 text-xl text-color interest'} key={item}
                                        onClick={() => navigate(location[index])}>
                                        {item}
                                    </li>
                                )
                            })}
            </ul>
        </div>
    </div>

    )
}