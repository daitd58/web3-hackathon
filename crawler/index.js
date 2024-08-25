import dotenv from 'dotenv';
import Web3 from 'web3';
import fs from 'fs'

dotenv.config();

function stringifyWithBigInt(obj) {
  return JSON.stringify(obj, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value, 2);
}

const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`));

const walletAddress = '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5'.toLowerCase();
const endBlock = 'latest';

async function getTransactions(walletAddress, endBlock) {
  try {
    const latestBlock = await web3.eth.getBlockNumber();
    const startBlock = latestBlock - 5n; //
    const walletAddressTransactions = [];

    for (let blockNumber = startBlock; blockNumber <= (endBlock === 'latest' ? latestBlock : endBlock); blockNumber++) {
      const block = await web3.eth.getBlock(blockNumber, true);
      if (block && block.transactions) {
        block.transactions.forEach((tx) => {
          if (walletAddress === tx.to || walletAddress === tx.from) {
            walletAddressTransactions.push(tx);
          }
        });
      }
    }
    fs.writeFileSync('transactions.json', stringifyWithBigInt(walletAddressTransactions));
    return walletAddressTransactions
  } catch (error) {
    console.error("err:", e);
  }
}

const totalTransaction = await getTransactions(walletAddress, endBlock)
console.log('Total transaction: ', totalTransaction.length, totalTransaction);
