import React from "react";

import {CommitBoxSwitchButtonBar} from "../commit-box-switch-button-bar";

import {Outlet} from "react-router-dom"

function CommitBox() {
    return (
        <div className="container mx-auto">
            <div
                className="
          max-w-md mx-auto flex flex-col items-center mt-10 rounded border-gray-200
          border p-4 shadow-md gap-y-4 bg-white
        "
            >
                <CommitBoxSwitchButtonBar/>

                <Outlet/>
            </div>
        </div>
    );
}

export {CommitBox};
