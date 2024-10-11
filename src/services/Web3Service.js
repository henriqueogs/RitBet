import Web3 from "web3";
import ABI from "./ABI.json";
const CONSTRACT_ADDRESS = "0x22FAD45076e19cB5b3152f2943b9505EbEF0Bb1A"

export async function doLogin() {

  if (!window.ethereum) throw new Error("MetaMask não está instalada");

  const web3 = new Web3(window.ethereum);
  console.log("window.ethereum", window.ethereum)
  console.log("web3", web3)
  const accounts = await web3.eth.requestAccounts()
  if (!accounts || !accounts.length) throw new Error(" MetaMask não autorizada!");
  console.log("Account", accounts)
  localStorage.setItem("wallet", accounts[0]);

  return accounts[0]
}

function getContract() {
  if (!window.ethereum) throw new Error("MetaMask não está instalada");

  const from = localStorage.getItem("wallet");
  const web3 = new Web3(window.ethereum);
  return new web3.eth.Contract(ABI, CONSTRACT_ADDRESS, { from });
}

export async function getDispute() {
  const contract = getContract();
  return contract.methods.dispute().call();
}
export async function placeBet(candidate, ammountInEth) {
  const contract = getContract();
  return contract.methods.bet(candidate).send({
    value: Web3.utils.toWei(ammountInEth, "ether"),
    gas: 138018,
    gasPrice: "29100000015"
  })
}
export async function finishDispute(winner) {
  const contract = getContract();
  return contract.methods.finish(winner).send({
    gas: 138018,
    gasPrice: "29100000015"
  }
  )
}

export async function claimPrize() {
  const contract = getContract();
  return contract.methods.claim().send({
    gas: 138018,
    gasPrice: "29100000015"
  })
}

