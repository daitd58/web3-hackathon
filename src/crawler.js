require("dotenv").config({ path: "../.env" });
const { Web3 } = require("web3");

const INFURA_URL = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URL));
const address = "0x316Fb96Cbe2fB52Dbe679d75B928FCFad858241B ";

async function getTransactions(address) {
  try {
    const latestBlockNumber = Number(await web3.eth.getBlockNumber());
    for (let i = 0; i <= latestBlockNumber; i++) {
      const block = await web3.eth.getBlock(latestBlockNumber - i, true);
      if (block?.transactions) {
        web3.eth.getTransactionFromBlock
        for (const tx of block.transactions) {
          const data = await web3.eth.getTransaction(tx.hash);
          console.log(`transactionHash ${tx.hash}:`, data);
        }
      }
    }
  } catch (e) {
    console.error("err:", e);
  }
}

getTransactions(address);
