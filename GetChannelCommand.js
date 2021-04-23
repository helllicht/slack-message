const AxiosInstance = require('./api/AxiosInstance');
const { orderBy } = require('lodash');
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Please paste your Slack token here:\n", function(token) {
    const axios = AxiosInstance(token);

    axios.get('/conversations.list', {
        params: {
            limit: 1000 // max limit
        }
    })
        .then((response) => {
            console.log('Got Response:');
            if (!response.data.ok) {
                console.info('Seems like something went wrong...');
                console.error(response.data.error);
                rl.close();
            }
            if (response.data.channels.length >= 999) {
                console.info('I hope we won\'t reach this point xD, because max results is 1.000');
                console.error('Reached limit of this call, you have more than 1000 channels and need to implement a pagination mechanism!');
            }

            const simplifiedChannels = [];
            response.data.channels.forEach((channel) => {
                simplifiedChannels.push({
                    name: channel.name,
                    id: channel.id
                })
            })

            console.table(orderBy(simplifiedChannels, ['name'], ['asc']));
            rl.close();
        })
        .catch((error) => {
            console.error(error)
            rl.close();
        })
});

rl.on("close", function() {
    console.log("\nDone");
    process.exit(0);
});
