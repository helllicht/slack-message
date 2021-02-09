const core = require('@actions/core');

// https://docs.github.com/en/actions/reference/environment-variables#default-environment-variables
const REF = process.env.GITHUB_REF.split('/').slice(2).join('/');

// Default messages - you can use all known icons from slack e.g :smile:
const failedMessage = `:x: *Deployment ist fehlgeschlagen!* \`Branch: ${REF}\``;
const successMessage = `:white_check_mark: *Deployment war erfolgreich!* \`Branch: ${REF}\``;

/**
 * @param {boolean} success
 * @param {string} commitMessage
 * @param {string} customMessage
 * @return {string}
 */
let createMessage = function (success, commitMessage = '', customMessage = '') {
    if (typeof customMessage === 'string' && customMessage.length > 0) {
        core.info('customMessage was passed, no branch and commit information will be shown!');

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
        message += ` \`commit: ${commitMessage}\``;
    }

    return message;
}

module.exports = createMessage;
