const web3 = new Web3("wss://ws.laika.rpc.anyblock.tools");

const txHash = "0xf512d5c687129c1a9c711f95b1ac27665ca0ff13fe4e89d5c826b30dbedf8aa8"
async function getRevertReason(txHash){
    const tx = await web3.eth.getTransaction(txHash)

    console.log('tx', tx)

    let result
    try {
        result = await web3.eth.call({from: tx.from, to: tx.to, gasPrice: tx.gasPrice, gas: tx.gas,
            value:tx.value, data: tx.input, nonce: tx.nonce}, tx.blockNumber)

        // const result =  await web3.eth.call(tx, tx.blockNumber)
    } catch(e) {
        console.log("failure", e)

        result = ((e.data).replace("Reverted", "")).trim()
        // return
    }

    console.log("'"+result+"'")

    result = result.startsWith('0x') ? result : `0x${result}`

    if (result) {

        const reason = web3.utils.toAscii(result)
        console.log('Revert reason:', reason)
        return reason

    } else {

        console.log('Cannot get reason - No return value')

    }

}

const reason = getRevertReason(txHash)
