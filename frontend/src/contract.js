// contract.js
import { ethers } from "ethers";
import TravelTrust from "./artifacts/contracts/TravelTrust.sol/TravelTrust.json";

// Change this if your deployed address is different
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export async function getContract() {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, TravelTrust.abi, signer);

  return contract;
}