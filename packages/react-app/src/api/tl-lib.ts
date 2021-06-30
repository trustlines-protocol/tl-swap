import {TLNetwork} from "@trustlines/trustlines-clientlib";
import {calcRaw} from "@trustlines/trustlines-clientlib/lib-esm/utils";
import {config} from "../config"

const tlNetwork = new TLNetwork({
    relayUrl: config.RELAY_URL,
});

export async function getCurrencyNetworks() {
    return tlNetwork.currencyNetwork.getAll();
}

export async function getDecimals(networkAddress: string) {
    return tlNetwork.currencyNetwork.getDecimals(networkAddress);
}

export function parseValue(value: string, decimals: number) {
    return calcRaw(value, decimals);
}

export async function getSpendableAmountAndPath(from: string, to: string, network: string) {

    const response = await fetch(`${config.RELAY_URL}/networks/${network}/max-capacity-path-info`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({from: from, to: to})
        }
    )

    const amountAndPath = await response.json()

    return amountAndPath
}
