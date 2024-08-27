const { Web3 } = require('web3');

const infuraUrl = `https://mainnet.infura.io/v3/85cfb83e8ce84d6ea99ef47e72b2aa9e`;
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

const fetchLatestBlockTransactions = async () => {
    try {
        const latestBlockNumber = await web3.eth.getBlockNumber();
        console.log(`Đang lấy giao dịch từ khối số: ${latestBlockNumber}`);

        const blockDetails = await web3.eth.getBlock(latestBlockNumber, true);

        if (blockDetails.transactions.length > 0) {
            console.log(`Tổng số giao dịch trong khối ${latestBlockNumber}: ${blockDetails.transactions.length}`);
            blockDetails.transactions.forEach((transaction, index) => {
                console.log(`Giao dịch ${index + 1}:`);
                console.log(`- Hash giao dịch: ${transaction.hash}`);
                console.log(`- Người gửi: ${transaction.from}`);
                console.log(`- Người nhận: ${transaction.to}`);
                console.log(`- Số lượng: ${web3.utils.fromWei(transaction.value, 'ether')} ETH`);
                console.log('---');
            });
        } else {
            console.log(`Không có giao dịch nào trong khối số: ${latestBlockNumber}.`);
        }
    } catch (error) {
        console.error('Lỗi khi lấy thông tin giao dịch:', error.message);
    }
};

setInterval(fetchLatestBlockTransactions, 10000);
