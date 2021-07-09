import React from "react";

import {ClaimBoxSwitchButtonBar} from "../claim-box-switch-button-bar";

import {Outlet} from "react-router-dom";

function ClaimBox() {
    return (
        <div className="container mx-auto">
            <div
                className="
          max-w-md mx-auto flex flex-col items-center mt-10 rounded border-gray-200
          border p-2 shadow-md gap-y-4
        "
            >
                <ClaimBoxSwitchButtonBar/>

                <Outlet/>
            </div>
        </div>
    );
}

export {ClaimBox};
