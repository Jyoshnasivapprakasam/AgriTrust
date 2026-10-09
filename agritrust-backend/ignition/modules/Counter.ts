import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("ENWRReceiptModule", (m) => {
  const receipt = m.contract("eNWRReceipt");

  return { receipt };
});