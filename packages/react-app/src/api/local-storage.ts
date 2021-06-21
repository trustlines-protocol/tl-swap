export function setCommitment(commitment: {
  secret: string;
  hashedSecret: string;
  yourTLAddress: string;
  counterpartyTLAddress: string;
  currencyNetworkAddress: string;
  tlAmount: string;
  ethAmount: string;
  claimPeriodInSec: string | number;
  yourETHAddress: string;
}) {
  localStorage.setItem(commitment.hashedSecret, JSON.stringify(commitment));
}
