const { Web3 } = require("web3");
require("dotenv").config();

const infuraUrl = `https://mainnet.infura.io/v3/${process.env.ENFURA_API_KEY}`;
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

async function getTransactionBlocks() {
  try {
    const transactions = [];
    const latestBlockNumber = Number(await web3.eth.getBlockNumber());
    for (let i = 0; i < 3; i++) {
      const blockNumber = Number(latestBlockNumber) - i;
      const block = await web3.eth.getBlock(blockNumber);
      const transactions = block.transactions;
      for (let tx of transactions) {
        const transactionDetails = await web3.eth.getTransaction(tx);
        console.log(`Details ${tx}: `, transactionDetails)
      }
    }
    return transactions;
  } catch (error) {
    console.error("Error", error);
  }
}

getTransactionBlocks();