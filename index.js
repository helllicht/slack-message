const core = require('@actions/core');
const AxiosInstance = require('./api/AxiosInstance')
const chooseIcon = require('./utils/chooseIcon');
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
        const commitMessage = core.getInput('commitMessage', isRequired);
        const customMessage = core.getInput('customMessage', isRequired);
        const customIcon = core.getInput('customIcon', isRequired);

        // decide which icon and text should be displayed
        const msgIcon = chooseIcon(success, customIcon);
        const msgText = createMessage(success, commitMessage, customMessage);

        core.info(`Icon: ${msgIcon}`);
        core.info(`Message: ${msgText}`);
        core.info(`Channel: ${channel}`);

        // post message
        const axios = AxiosInstance(token);
        axios.post('/chat.postMessage', {
            channel: channel,
            text: msgText,
            icon_emoji: msgIcon
        })
            .then(() => {
                core.info('Send message.')
            })
            .catch((error) => {
                core.error('Message could not be send!');
                core.error(error);
                core.setFailed('Slack send error!')
            })

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
