const core = require('@actions/core');

// https://docs.github.com/en/actions/reference/environment-variables#default-environment-variables
const REF = process.env.GITHUB_REF.split('/').slice(2).join('/');

/**
 * INFO:
 * use Markdown for formatting!
 * \n => newline BUT in js strings escape the \ with a \ so you get => \\n
 */

// Default messages - you can use all known icons from slack e.g :smile:
const failedMessage = `:x: *Deployment ist fehlgeschlagen!*\\n\`Branch: ${REF}\``;
const successMessage = `:white_check_mark: *Deployment war erfolgreich!*\\n\`Branch: ${REF}\``;

/**
 * @param {boolean} success
 * @param {string} commitMessage
 * @param {string} committer
 * @return {string}
 */
let createMessage = function (success, commitMessage = '', committer = '') {
    let message;

    if (success) {
        core.info('Use success default message.');

        message = successMessage;
    } else {
        core.info('Use failure default message.');

        message = failedMessage
    }

    if (typeof committer === 'string' && committer.length > 0) {
        message += `\\n\`committed by:\n${committer}\``;
    }

    if (typeof commitMessage === 'string' && commitMessage.length > 0) {
        message += `\\n\`\`\`commit:\n${commitMessage}\`\`\``;
    }

    return message;
}

module.exports = createMessage;
