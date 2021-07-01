import React from "react";
import {Button} from "../button";

import {getTLTransaction} from "../../utils/tl-swap";
import {Log} from "@ethersproject/abstract-provider"
import {getCommitment} from "../../api/local-storage";

interface ITLTransaction {
    blockHash: string,
    confirmations: number,
    logs: Array<Log>,
    isSuccessfull: boolean
}

function Step4(props: {
    yourTLAddress: string;
    counterpartyTLAddress: string;
    currencyNetworkAddress: string;
    tlAmount: string;
    ethAmount: string;
    claimPeriodInSec: string;
    yourETHAddress: string;
    hashedSecret: string,
    txHash: string
}) {
    const {txHash, hashedSecret} = props
    const [shareLink, setShareLink] = React.useState("");
    const [transaction, setTransaction] = React.useState<null | ITLTransaction>(null)
    const [secret, setSecret] = React.useState("")

    React.useEffect(() => {
        (async () => {
            const tlTransaction = await getTLTransaction(txHash)
            const localCommitment = await getCommitment(hashedSecret)

            setSecret(localCommitment.secret)

            setTransaction(tlTransaction)

            const shareLink = `${process.env.PUBLIC_URL}/commit?hashed-secret=${hashedSecret}&eth-address=${props.yourETHAddress}`;
            setShareLink(shareLink);

        })();
    }, []);

    const handleClickCopy = async () => {
        await navigator.clipboard.writeText(shareLink);
    };

    return (
        <>
            <div className="mt-4 text-center break-words" style={{wordBreak: "break-word"}}>
                Write down your secret: <strong>{secret}</strong>. You'll need it when you want to claim your Eth.
            </div>
            <>
                <div className="text-xs" style={{wordBreak: "break-word"}}>
                    The tx was signed. You can give the following link to the counterparty. <br/>
                    {shareLink}
                </div>
            </>
            <Button buttonType="primary" onClick={handleClickCopy} fullWidth>
                Copy Link
            </Button>
        </>
    );
}

export {Step4};
