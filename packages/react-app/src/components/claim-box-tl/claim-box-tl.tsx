import React,{useState} from "react";

import {Step1} from "./step-1";
import {Step2} from "./step-2";
import {Step3} from "./step-3";

import {useStore} from "../../store";

function ClaimBoxTl() {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [hashedSecret, setHashedSecret] = useState("");
    const [secret, setSecret] = useState("")
    const [path, setPath] = useState<Array<string>>([])

    if (currentStepIndex === 0) {
        return (
            <Step1
                onChangeHashedSecret={setHashedSecret}
                hashedSecret={hashedSecret}
                onClickContinue={() => {
                    if (hashedSecret) {
                        setCurrentStepIndex(1);
                    }
                }}
            />
        );
    }

    if (currentStepIndex === 1) {
        return (
            <Step2
                secret={secret}
                onChangeSecret={setSecret}
                hashedSecret={hashedSecret}
                onChangePath={setPath}
                onClickBack={() => setCurrentStepIndex(0)}
                onClickContinue={() => setCurrentStepIndex(2)}
            />
        );
    }

    if (currentStepIndex === 2) {
        return (
            <Step3
                secret={secret}
                path={path}
            />
        );
    }

    return null;
}

export {ClaimBoxTl};
