require('dotenv').config();
const { Web3 } = require('web3');

const infuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`;

const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

const filterAddress = '0x4675C7e5BaAFBFFbca748158bEcBA61ef3b0a263'?.toLowerCase();

async function getBlockTransaction() {
  try {
    const latestBlock = await web3.eth.getBlockNumber();

    for (let i = 0; i < 1; i++) {
      const blockNumber = Number(latestBlock) - 1;
      const block = await web3.eth.getBlock(blockNumber);
      const transactions = block.transactions;
      
      for (let bl of transactions) {
        const transaction = await web3.eth.getTransaction(bl);
        if (transaction?.from?.toLowerCase() === filterAddress || transaction?.to?.toLowerCase() === filterAddress) {
          console.log(`Transaction found in block ${blockNumber}:`, transaction);
        }
      }
    }

  } catch (error) {
    console.error('Error fetching logs:', error);
  }
}

getBlockTransaction();
