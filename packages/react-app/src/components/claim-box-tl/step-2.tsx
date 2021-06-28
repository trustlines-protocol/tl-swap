import React, {useState} from "react";

import {LabeledInput} from "../labeled-input";
import {isAddress} from "@ethersproject/address"
import {hexlify} from "@ethersproject/bytes";
import {randomBytes} from "@ethersproject/random";
import {keccak256} from "@ethersproject/keccak256";
import {getDecimals, getSpendableAmountAndPath, parseValue} from "../../api/tl-lib";
import {parseEther} from "@ethersproject/units";
import {setCommitment} from "../../api/local-storage";
import {getCommitment, populateCommitTx} from "../../utils/tl-swap";
import {ICommitment} from "../../api/types";
import {commit} from "../../utils/eth-swap";
import {useQuery} from "react-query";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"
const isExistingCommitment = (commitment: ICommitment | null): boolean => {
    if (commitment) {
        return (commitment.initiator !== ZERO_ADDRESS && commitment.recipient !== ZERO_ADDRESS)
    }

    return false
}

function Step2(props: {
    onChangePath: (path: string[]) => void;
    onChangeSecret: (secret: string) => void;
    secret: string,
    hashedSecret: string,
    onClickBack: () => void;
    onClickContinue: () => void;
}) {
    const [commitment, setCommitment] = useState<null | ICommitment>(null)
    const [error, setError] = useState<null | string>(null)
    const [loading, setLoading] = useState(false)
    const [spendableAmountArgs, setSpendableAmountArgs] = useState<{
        from: string | null,
        to: string | null,
        network: string | null
    }>({from: null, to: null, network: null})

    React.useEffect(() => {
        (async () => {
            setLoading(true)

            try {
                const contractCommitment: ICommitment = await getCommitment(props.hashedSecret)

                console.log('contract commitment', contractCommitment)
                setCommitment(contractCommitment)
                setSpendableAmountArgs({
                    from: contractCommitment.initiator,
                    to: contractCommitment.recipient,
                    network: contractCommitment.TLNetwork
                })
            } catch (e) {
                let message = "Failed to fetch commitment. Check your hashedSecret. Raw error: " + e.message
                setError(message)
            }

            setLoading(false)


        })();
    }, []);

    console.log("error", error)

    // return null


    const {data, isLoading, isError} = useQuery(
        ["spend", spendableAmountArgs],
        () => {
            // @ts-expect-error
            return getSpendableAmountAndPath(spendableAmountArgs.from, spendableAmountArgs.to, spendableAmountArgs.network)
        },
        {
        enabled: spendableAmountArgs.from !== null && isAddress(spendableAmountArgs.from),
        }
    )

    if(data) {
        props.onChangePath(data.path)
    }
    //
    // console.log('commitment', data)
    return (
        <>
            {error && <div className={""}>{error}</div>}
            {loading && !commitment && <div>Loading commitment information.</div>}
            {commitment && isExistingCommitment(commitment) && (<div>
                <div>
                    from: <strong>{commitment.initiator}</strong>
                    to: <strong>{commitment.recipient}</strong>
                </div>
                <div>
                    TL Network: <strong>{commitment.TLNetwork}</strong>
                </div>

                <div>
                    TL Money Amount: <strong>{String(commitment.TLMoneyAmount)}</strong>
                </div>

                <div>
                    Eth Amount: <strong>{String(commitment.EthAmount)}</strong>
                </div>

                <div>
                    TL Network: <strong>{commitment.TLNetwork}</strong>
                </div>

                {!!commitment && isLoading && (
                    <div>Looking for a path between the users.</div>
                )}
                {!!commitment && data?.capacity > 0 && (
                    <div>
                        There is a path between the 2 accounts with capacity of {data.capacity}
                    </div>
                )}

                <LabeledInput
                    id="hashedSecretInput"
                    label="Enter Secret"
                    value={props.secret}
                    onChangeInputValue={props.onChangeSecret}
                />
            </div>)}

            {commitment && !isExistingCommitment(commitment) && (
                <div>
                    We cannot find any commitment for this hash.({props.hashedSecret})
                </div>
            )}

            <div className="flex flex-row gap-x-2 w-full">
                <button
                    className="border w-full px-4 py-2 flex-1"
                    onClick={props.onClickBack}
                >
                    Back
                </button>
                {!error && (
                    <button
                        className="border w-full px-4 py-2 flex-1"
                        onClick={props.onClickContinue}
                    >
                        Claim
                    </button>
                )}
            </div>
        </>
    );
}

export {Step2};
