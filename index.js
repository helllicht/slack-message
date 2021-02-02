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
        const token = core.getInput('token', isRequired);
        const channel = core.getInput('channel', isRequired);
        const success = stringToBool(core.getInput('success', isRequired));
        const customMessage = core.getInput('customMessage');
        const customIcon = core.getInput('customIcon');

        // decide which icon and text should be displayed
        const msgIcon = chooseIcon(success, customIcon);
        const msgText = createMessage(success, customMessage);

        // post message
        const axios = AxiosInstance(token);
        axios('/chat.postMessage', {
            channel: channel,
            text: msgText,
            icon_emoji: msgIcon
        })

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
