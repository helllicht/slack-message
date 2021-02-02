// Default messages - you can use all known icons from slack e.g :smile:
const failedMessage = 'Deployment ist fehlgeschlagen!';
const successMessage = 'Deployment war erfolgreich!';

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
