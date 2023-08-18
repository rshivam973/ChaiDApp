const hre = require("hardhat");
require("@nomiclabs/hardhat-ethers");

async function main() {
  const ChaiContract = await hre.ethers.getContractFactory("chai");
  const chai = await ChaiContract.deploy();

  await chai.deployed();

  console.log("Chai contract deployed to:", chai.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
//0xfD57C45f81195fB6eFc9fc24B24b274BC9a9401c contract address

