const core = require('@actions/core');
const { has } = require('lodash');
const AxiosInstance = require('./api/AxiosInstance')
const createMessage = require('./utils/createMessage');
const stringToBool = require('./utils/stringToBool');

/**
 * The main function of the github action!
 * @return {Promise<void>}
 */
function run() {
    try {
        const isRequired = { required: true };

        // input
        const token = core.getInput('slackToken', isRequired);
        const channel = core.getInput('channel', isRequired);
        const success = stringToBool(core.getInput('success', isRequired));
        const commitMessage = core.getInput('commitMessage');
        const customMessage = core.getInput('customMessage');
        const committer = core.getInput('committer');
        const axios = AxiosInstance(token);
        let channelId = null;

        axios.get('/conversations.list', {
            params: {
                limit: 1000 // max limit
            }
        })
            .then((response) => {
                if (!response.data.ok) {
                    core.setFailed('API call for getting all channel ids failed!');
                    throw new Error(response.data.error);
                }
                if (response.data.channels.length >= 999) {
                    core.setFailed('I hope we won\'t reach this point xD, because max results is 1.000');
                    throw new Error('Reached limit of this call, you have more than 1000 channels and need to implement a pagination mechanism!');
                }

                // if filter didn't find a correct object it will return an empty array;
                let slackChannelList = [];
                if (response.data.channels && response.data.channels.length > 0) {
                    slackChannelList = response.data.channels.filter(slackChannels => slackChannels.name === channel)
                }
                if (slackChannelList.length > 1) {
                    // is it een allowed to have two channel with the same name in slack? idk...
                    core.warning('Found more than one channel with the given name! Script is choosing the first one.');
                }
                if (slackChannelList.length === 1 && has(slackChannelList[0], 'id')) {
                    channelId = slackChannelList[0].id;
                } else {
                    core.setFailed(`No Channel was found with given name: ${channel}`)
                    throw new Error('Invalid channel was passed?! Probably a typo or channel has been deleted?')
                }

                // ### prepare message ###

                // decide which icon and text should be displayed
                let msgText = '';
                if (customMessage.length > 0) {
                    core.info('customMessage was passed, no branch and commit information will be shown!');
                    msgText = customMessage;
                } else {
                    msgText = createMessage(success, commitMessage, committer);
                }

                core.info(`Channel: ${channel}`);
                core.info(`Message: ${msgText}`);

                axios.post('/chat.postMessage', {
                    channel: channelId,
                    mrkdwn: true,
                    text: msgText,
                })
                    .then(() => {
                        core.info('Send message.')
                    })
                    .catch((error) => {
                        core.error('Message could not be send!');
                        core.error(error);
                        core.setFailed('Slack send error!')
                    });
            })
            .catch((error) => {
                core.setFailed(error);
            });
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
