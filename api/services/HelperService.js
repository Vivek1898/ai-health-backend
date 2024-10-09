/**
 * Contains all custom functions
 */


Number.prototype.round = function () {
    if (isNaN(this) || this === Infinity) {
        return 0;
    } else {
        return +Math.round((this + Number.EPSILON) * 100) / 100;
    }
};

Number.prototype.roundPerc = function () {
    if (isNaN(this) || this === Infinity) {
        return 0;
    } else {
        return +Math.round(this);
    }
};

Number.prototype.money = function (currencyCode) {
    return MoneyService.formatCurrency(currencyCode, this);
};

String.prototype.sanitize = function () {
    return this.replace(/[']/g, "''").replace(/[%_]/g, "\\$&").replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

String.prototype.psqlCompatible = function () {
    return this.replace(/[']/g, "''");
};

String.prototype.toProperCase = function toProperCase() {
    return this.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
        return match.toUpperCase();
    });
};

module.exports = {


    /**
     * convert string to snake case.
     *
     * @param {string} value - value
     */

    detectDataType: async(value) => {
        let type = 'text';
        if (_.isString(value)) {
            try {
                new URL(value);
                type = 'url';
            } catch (error) {
                // Check if the value is a valid date string
                const dateValue = new Date(value);
                if (!isNaN(dateValue)) {
                    type = 'date'
                } else {
                    const htmlRegex = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>|<([A-Za-z][A-Za-z0-9]*)\b[^\/]*\/>/;
                    type = htmlRegex.test(value) ? 'html' : 'text';
                }
            }
        } else if (_.isNumber(value)) {
            type = 'number';
        } else if (value instanceof Date && !isNaN(value)) {
            type = 'date';
        } else if (_.isBoolean(value)) {
            type = 'boolean';
        }
        return type;
    },

    /**
     * Check if the encrypted password and the other password is same.
     *
     * @param {string} password - Password
     * @param {string} encryptedPassword - Encrypted password
     * @returns {Promise<boolean>} - Return comparison result
     */

    isSamePassword: async (password, encryptedPassword) => {
        return await Bcrypt.compare(password, encryptedPassword);
    },


};
