const core = require('@actions/core');

// https://docs.github.com/en/actions/reference/environment-variables#default-environment-variables
const REF = process.env.GITHUB_REF.split('/').slice(2).join('/');

// Default messages - you can use all known icons from slack e.g :smile:
const failedMessage = `*Deployment ist fehlgeschlagen!* \`Branch: ${REF}\``;
const successMessage = `*Deployment war erfolgreich!* \`Branch: ${REF}\``;

/**
 * @param {boolean} success
 * @param {string} commitMessage
 * @param {string} customMessage
 * @return {string}
 */
let createMessage = function (success, commitMessage = '', customMessage = '') {
    if (typeof customMessage === 'string' && customMessage.length > 0) {
        core.info('customMessage was passed');

        return customMessage;
    }

    let message;

    if (success) {
        core.info('Use success default message.');

        message = successMessage;
    } else {
        core.info('Use failure default message.');

        message = failedMessage
    }

    if (typeof commitMessage === 'string' && commitMessage.length > 0) {
        core.info(`commitMessage was passed: ${commitMessage}`);

        message += ` \`commit: ${commitMessage}\``;
    }

    return message;
}

module.exports = createMessage;
