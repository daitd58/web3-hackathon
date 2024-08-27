require('dotenv').config();
const { Web3 } = require('web3');

const infuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`;
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

async function getBlockTransaction(filteredAddress) {
  try {
    const latestBlock = await web3.eth.getBlockNumber();

    for (let i = 0; i < 2; i++) {
      const blockNumber = Number(latestBlock) - i;
      const block = await web3.eth.getBlock(blockNumber, true);

      if (block && block.transactions) {
        for (const transactionHash of block.transactions) {
          const transaction = await web3.eth.getTransaction(transactionHash.hash);

          if (transaction.from === filteredAddress || transaction.to === filteredAddress) {
            console.log(
              `Transaction found in block ${blockNumber}:`,
              transaction
            );
          }
        }
      }
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
}

const filteredAddress = '0x4838b106fce9647bdf1e7877bf73ce8b0bad5f97';
getBlockTransaction(filteredAddress);
