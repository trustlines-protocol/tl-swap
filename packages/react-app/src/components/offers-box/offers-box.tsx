import React, {useEffect, useState} from "react";
import {collection, query, where, onSnapshot, getFirestore, addDoc, doc} from "firebase/firestore";
import {LabeledInput} from "../labeled-input";
import {QrCodeScannerModal} from "../qr-code-scanner-modal";
import {CurrencyNetworkSelect} from "../currency-network-select";
import {useCurrencyNetworks} from "../../hooks/useCurrencyNetworks";
import {getSpendableAmountAndPath} from "../../api/tl-lib";


interface Offer {
    expires: string;
    tlAddress: string;
    network: string;
    tlAmount: string;
    ethAmount: string;
}

function RenderPathInfo({pathInfo}: { pathInfo: null | { capacity: string, path: Array<string> } }) {
    if (pathInfo === null) {
        return null
    }

    const {capacity, path} = pathInfo
    let hopsText = null

    if (path.length === 2) {
        hopsText = "direct path"
    }

    if (path.length > 2) {
        const hops = path.length - 2
        hopsText = `${hops} hop(s)`
    }

    return (
        <>
            The path has a capacity of {capacity} over {hopsText}. ({path.join(',')})
        </>
    )
}

function Offer({offer, pathTo}: { offer: Offer, pathTo?: string }) {
    const [hasPath, setHasPath] = useState(false)
    const [pathInfo, setPathInfo] = useState(null)
    const [expand, setExpand] = useState(false)
    useEffect(() => {
        const findPath = async () => {
            if (pathTo) {
                try {
                    const amountAndPath = await getSpendableAmountAndPath(offer.tlAddress, pathTo, offer.network)

                    console.log('amount And path', amountAndPath)

                    const {capacity} = amountAndPath

                    if (capacity > 0 && capacity >= offer.tlAmount) {
                        setHasPath(true)
                        setPathInfo(amountAndPath)
                    }
                } catch (e) {

                }


            }

        }

        findPath()
    }, [pathTo, offer.tlAddress, offer.network])
    return (
        <>
                <div className={`table-row  group hover:bg-red-200 hover:cursor-pointer ${expand ? "bg-red-200" : ""}`} onClick={() => setExpand(!expand)}>
                    <div className={"table-cell p-2 group-hover:bg-red-200 group-hover:rounded-tl-lg group-hover:rounded-bl-lg"}>{offer.expires}</div>
                    <div className={"table-cell text-sm p-2"}>{offer.tlAddress}</div>
                    <div className={"table-cell p-2"}>{offer.tlAmount}</div>
                    <div className={"table-cell p-2"}>{offer.ethAmount}</div>
                    <div className={"table-cell p-2 group-hover:bg-red-200 group-hover:rounded-tr-lg group-hover:rounded-br-lg"}>
                        {hasPath && <RenderPathInfo pathInfo={pathInfo}/>}
                    </div>
                </div>

            {expand && (
                <div className={`table-row ${expand ? "bg-red-200" : ""}`}>
                    <div className={"table-cell"}>more info</div>
                </div>
            )
            }
        </>

    )

}

function OfferForm({onSubmitted}: { onSubmitted: (id: string) => void }) {
    const [expires, setExpires] = useState("")
    const [yourTLAddress, setYourTLAddress] = useState("")
    const [showQrCodeScanner, setShowQrCodeScanner] = React.useState<boolean>(
        false
    );

    const [tlAmount, setTLAmount] = useState("")
    const [ethAmount, setEthAmount] = useState("")
    // const [qrCodeScannerContext, setQrCodeScannerContext] = React.useState<"yourTLAddress">("yourTLAddress");

    const {isLoading, data = [], status} = useCurrencyNetworks();
    const [network, setNetwork] = useState("")
    React.useEffect(() => {
        if (status === "success") {
            setNetwork(data[0].address);
        }
    }, [status, data]);

    const handleScannedData = (scannedData: string) => {
        const url = new URL(scannedData);

        if (url.pathname.startsWith("/contact")) {
            const splitPathname = url.pathname.split("/");
            const tlAddress = splitPathname[splitPathname.length - 1];

            setYourTLAddress(tlAddress);
        }
    };

    const onSubmit = async () => {
        console.log('expires', expires)
        const db = getFirestore()
        const docRef = await addDoc(collection(db, "offers"), {
            expires: expires,
            network: network,
            tlAddress: yourTLAddress,
            tlAmount: tlAmount,
            ethAmount: ethAmount
        });

        if (docRef.id) {
            onSubmitted(docRef.id)
        }

    }

    return (
        <>
            <QrCodeScannerModal
                isOpen={showQrCodeScanner}
                onError={(error) => console.log(error)}
                onRequestClose={() => setShowQrCodeScanner(false)}
                onScan={handleScannedData}
            />
            <LabeledInput
                id="yourTLAddressInput"
                label="Your TL Address"
                value={yourTLAddress}
                onChangeInputValue={(value) => setYourTLAddress(value)}

                withScanButton
                onClickScanButton={() => {
                    setShowQrCodeScanner(true);
                }}
            />
            <CurrencyNetworkSelect
                currencyNetworks={data}
                isLoading={isLoading}
                onChangeNetwork={(value) => setNetwork(value)}
            />
            <LabeledInput
                id="tlAmount"
                label="Total TL Amount"
                value={tlAmount}
                onChangeInputValue={value => setTLAmount(value)}
                type="number"
                min={0}
            />
            <LabeledInput
                id="ethAmount"
                label="Total ETH Amount"
                value={ethAmount}
                onChangeInputValue={(value) => setEthAmount(value)}
                type="number"
                min={0}
            />

            <LabeledInput
                id="expires"
                label="Offer valid till"
                value={expires}
                onChangeInputValue={(value) => setExpires(value)}
                type="date"
            />

            <button onClick={onSubmit}>submit</button>

        </>

    )
}

function OffersTable({offers, counterPartyAddress}: { offers: null | Array<Offer>, counterPartyAddress: string }) {
    return (
        <>
            <div className={"table w-full"}>
                <div className={"table-header-group font-bold"}>
                    <div className={"table-cell p-2"}>Valid till</div>
                    <div className={"table-cell p-2"}>Currency network</div>
                    <div className={"table-cell p-2"}>Tl Amount</div>
                    <div className={"table-cell p-2"}>Eth Amount</div>
                    <div className={"table-cell p-2"}></div>
                </div>

                {offers && offers.map(offer => <Offer offer={offer} pathTo={counterPartyAddress}/>)}
            </div>

        </>

    )
}

function OffersBox() {
    const [displayForm, setDisplayForm] = useState(false)
    const [offers, setOffers] = useState<null | Array<any>>(null)
    const [counterPartyAddress, setCounterPartyAddress] = useState("")
    useEffect(() => {
        const db = getFirestore()
        const q = query(collection(db, "offers"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const dbOffers: Array<any> = []

            querySnapshot.forEach((doc) => {
                dbOffers.push(doc.data())
            })

            setOffers(dbOffers)
        })

        return () => unsubscribe()
    }, [])

    let content = (
        <>
            <LabeledInput
                id="search"
                label="Your address"
                value={counterPartyAddress}
                onChangeInputValue={value => setCounterPartyAddress(value)}
                type="text"
            />
            <button onClick={() => {
                setDisplayForm(true)
            }} className={"btn"}>Create offer
            </button>
            {offers && offers.length === 0 && <div>No offers available. Create one?</div>}
            <OffersTable offers={offers} counterPartyAddress={counterPartyAddress}/>

        </>
    )


    if (displayForm) {
        content = <OfferForm onSubmitted={() => setDisplayForm(false)}/>
    }
    return (
        <div className="container mx-auto">
            <div
                className="
         mx-auto flex flex-col items-center mt-10 rounded border-gray-200
          border p-2 shadow-md gap-y-4
        "
            >
                {content}
            </div>
        </div>
    );
}

export {OffersBox};