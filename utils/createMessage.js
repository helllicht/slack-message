// https://docs.github.com/en/actions/reference/environment-variables#default-environment-variables
const REF = process.env.GITHUB_REF.split('/').slice(2).join('/');

// Default messages - you can use all known icons from slack e.g :smile:
const failedMessage = `Deployment ist fehlgeschlagen! Branch: ${REF}`;
const successMessage = `Deployment war erfolgreich! Branch: ${REF}`;

/**
 * @param {boolean} success
 * @param customMessage
 * @return {string}
 */
let createMessage = function (success, customMessage = '') {
    if (typeof customMessage === 'string' && customMessage.length > 0) {
        return customMessage;
    } else if (success) {
        return successMessage;
    }

    return failedMessage;
}

module.exports = createMessage;
