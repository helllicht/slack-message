const core = require('@actions/core');

// https://docs.github.com/en/actions/reference/environment-variables#default-environment-variables
const REF = process.env.GITHUB_REF.split('/').slice(2).join('/');

/**
 * INFO:
 * use Markdown for formatting!
 * https://api.slack.com/reference/surfaces/formatting#basics
 * https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#webhook-payload-example-1
 */

const nl = '\n';

// Default messages - you can use all known icons from slack e.g :smile:
const failedMessage = `:x: *Deployment ist fehlgeschlagen!*${nl}*Branch:* \`${REF}\``;
const successMessage = `:white_check_mark: *Deployment war erfolgreich!*${nl}*Branch:* \`${REF}\``;

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
        message += `${nl}*Committer:* \`${committer}\``;
    }

    if (typeof commitMessage === 'string' && commitMessage.length > 0) {
        message += `${nl}\`\`\`${commitMessage}\`\`\``;
    }

    if (!success) {
        const urlText = 'Action-Log ansehen';
        const actionUrl = `<https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}|${urlText}>`;
        message += `${nl}${actionUrl}`;
    }

    return message;
}

module.exports = createMessage;
