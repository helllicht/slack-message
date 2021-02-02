// icons
const failedIcon = ':x:';
const successIcon = ':white_check_mark:';

/**
 * @param {boolean} success
 * @param customIcon
 * @return {string}
 */
let chooseIcon = function (success, customIcon = '') {
    if (typeof customIcon === 'string' && customIcon.length > 0) {
        return customIcon;
    } else if (success) {
        return successIcon;
    }

    return failedIcon;
}

module.exports = chooseIcon;
