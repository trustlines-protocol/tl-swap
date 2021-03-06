import React, {useState} from "react";
import QRCode from "react-qr-code";
import {generateClaimTx} from "../../utils/tl-swap";

function Step3(props: {
    path: Array<string>,
    hashedSecret: string,
    secret: string,
}) {
    const {hashedSecret, path, secret} = props

    const [appLink, setAppLink] = useState("")

    React.useEffect(() => {
        (async () => {

            const rawTransaction = await generateClaimTx({
                path: path,
                maxFee: "100000000",
                extraData: "",
                proof: secret
            })

            const appLink = `https://link.trustlines.app/signClaim?from=${path[0]}&to=${rawTransaction.to}&data=${rawTransaction.data}&hashedSecret=${hashedSecret}`;
            setAppLink(appLink);
        })();
    }, [path, secret, hashedSecret]);

    return (
        <div>
            {appLink === "" ? (
                <div>Creating QR code...</div>
            ) : (
                <QRCode value={appLink}/>
            )}
        </div>

    )


}

export {Step3};
