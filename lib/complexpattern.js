/**
 * ComplexPattern class is the object which contain SinglePattern and ComplexPattern.
 * @param {string} name The name of class.
 * @param {Function} func The function to validate.
 * @constructor
 * @extends {Type}
 */
ComplexPattern = function(name, pattern) {
    this.name = name;
    this.pattern = pattern;
    this.type = COMPLEXPATTERN;
};
ComplexPattern.prototype = new validation.type.Type();
ComplexPattern.prototype.constructor = ComplexPattern;

//export
validation.type.ComplexPattern = ComplexPattern;