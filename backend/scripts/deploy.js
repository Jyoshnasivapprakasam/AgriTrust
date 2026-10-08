const hre = require("hardhat");

async function main() {
  const eNWR = await hre.ethers.getContractFactory("eNWRReceipt");
  const contract = await eNWR.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log(`✅ eNWRReceipt Smart Contract Deployed to Local Node: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});