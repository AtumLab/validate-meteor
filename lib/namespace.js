/**
 * 
 * @stable
 */

var VALID_KEYS = [
    "validate", // function
    "test", // function
    "set", // function
    "Pattern", // class
    "Element", // class
    "Error", // class
    "Model", // class
    "Optional" // class
];
validation._options = {};
/**
 * 
 * @param {object} options
 * @return {null}
 */
validation.config = function(options) {
    _.each(_.keys(options), function (key) {
        if (!_.contains(VALID_KEYS, key)) {
            throw new Error("Validation.config > Invalid key: " + key);
        }
    });
    // set values in Validation._options
    _.each(VALID_KEYS, function (key) {
        if (key in options) {
            if (key in validation._options) {
                throw new Error("Can't set `" + key + "` more than once");
            } 
            else {
                validation._options[key] = options[key];
            }
        }
    });
}
/**
 * 
 * @param {string} key
 * @return {object}
 */
validation.get = function(key) {
    if(this._options[key])
        return this._options[key];
    throw new Error("Validation.get: Invalid key: " + key);
}