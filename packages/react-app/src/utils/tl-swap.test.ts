import { parseEther } from "@ethersproject/units";
import { keccak256 } from "@ethersproject/keccak256";
import { randomBytes } from "@ethersproject/random";

import { populateCommitTx } from "./tl-swap";

const COMMIT_ARGS = {
  yourTLAddress: "0x4F4ABE98Ac96b804d41837192ef0b73EB0C502E6",
  counterpartyTLAddress: "0x4F4ABE98Ac96b804d41837192ef0b73EB0C502E6",
  currencyNetworkAddress: "0x4F4ABE98Ac96b804d41837192ef0b73EB0C502E6",
  parsedETHAmount: parseEther("1").toString(),
  parsedTLAmount: parseEther("1").toString(),
  claimPeriodInSec: String(24 * 60 * 60),
  yourETHAddress: "0x4F4ABE98Ac96b804d41837192ef0b73EB0C502E6",
  hashedSecret: keccak256(randomBytes(32)),
};

test("should populate unsigned claim tx", async () => {
  const unsignedCommitTx = await populateCommitTx(COMMIT_ARGS);
  expect(unsignedCommitTx).toHaveProperty("from");
});
