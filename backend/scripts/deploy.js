const { ethers } = require("hardhat");

async function main() {
  const TravelTrust = await ethers.getContractFactory("TravelTrust");
  const trust = await TravelTrust.deploy();
  await trust.waitForDeployment(); // Use this instead of .deployed()
  console.log(`TravelTrust deployed to: ${trust.target}`); // Use .target instead of .address
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
