const { Web3 } = require("web3");
const web3 = new Web3(
  "https://mainnet.infura.io/v3/68f75109e4fc4cd8b073789d9d3311a4"
);

async function getTransactions() {
  for (let i = 0; i <= 3; i++) {
    const block = await web3.eth.getBlock(i, true);
    if (block && block.transactions) {
      block.transactions.forEach((tx) => {
        console.log(`
            Block Number: ${i}
            Transaction Hash: ${tx.hash}
            From: ${tx.from}
            To: ${tx.to}
            Value: ${web3.utils.fromWei(tx.value, "ether")} ETH
          `);
      });
    }
  }
}

getTransactions();
