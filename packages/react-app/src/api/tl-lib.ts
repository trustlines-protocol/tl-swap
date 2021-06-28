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

    // curl --header "Content-Type: application/json" \
    // --request POST \
    // --data '{"from":"0xcbF1153F6e5AC01D363d432e24112e8aA56c55ce","to":"0x7Ec3543702FA8F2C7b2bD84C034aAc36C263cA8b"}' \
    // https://relay0.testnet.trustlines.network/api/v1/networks/0xC0B33D88C704455075a0724AA167a286da778DDE/max-capacity-path-info
}

export async function relayTransaction(rawTransaction:any) {
    const response = await fetch(`${config.RELAY_URL}/relay`, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({rawTransaction: rawTransaction})
    })

    const txHash = await response.text()

    return txHash
}
