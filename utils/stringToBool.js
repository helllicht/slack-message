/**
 * @param {string} input
 * @return {boolean}
 */
let stringToBool = function (input= '') {
    if (typeof input === 'string' && input.length > 0) {
        if (input === '1' || input === 'true') {
            return true;
        }
    }

    return false;
}

module.exports = stringToBool;
