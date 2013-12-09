/**
 * SinglePattern class 
 * @param {string} name The name of class.
 * @param {Function} func The function to validate.
 * @constructor
 * @extends {Type}
 */
SinglePattern = function(name, func) {
    this.name = name;
    this.pattern = func;
    this.type = SINGLEPATTERN;
};
SinglePattern.prototype = new validation.type.Type();
SinglePattern.prototype.constructor = SinglePattern;
SinglePattern.prototype.test = function(args){
    if(!checkArray(args))
        args = [args];
    return this.pattern.apply(this, args);
};
/**
SinglePattern.prototype.validate = function(args, message){
    if(!this.test(args)){
        var m = message || this.getMessage();
        throw new VError(403, new m('', this.name));
    }
}
*/

/** 
 * SinglePattern type support
 */
var setSinglePattern = validation.get('set');

setSinglePattern('Any', function(val) {
    return true;
});

// @reference https://github.com/jashkenas/underscore/blob/master/underscore.js
['Arguments', 'Number', 'Date'].forEach(function(name) {
    setSinglePattern(name, function(obj) {
        return (Object.prototype.toString.call(obj) == '[object ' + name + ']');
    });
});

setSinglePattern('Function', checkFunction);

/**
 * String
 */
setSinglePattern('String', function(obj, min, max) {
    if(!checkString(obj)) {
        return false;
    }
    if(min){
        if(!getPattern('Min').test([obj, min]))
            return false;
    }
    if(max){
        if(!getPattern('Max').test([obj, max]))
            return false;
    }
    return true;
});

setSinglePattern('Min', function( value, param ) {
    var length = checkArray(value) ? value.length : value.trim().length; // trim >= IE9
    if(length >= param){
        return true;
    }
    return false;
});

setSinglePattern('Max', function( value, param ) {
    var length = checkArray(value) ? value.length : value.trim().length; // trim >= IE9
    if(length <= param){
        return true;
    }
    return false;
});

// @reference http://stackoverflow.com/questions/8511281/check-if-a-variable-is-an-object
setSinglePattern('Object', checkObject);

// @reference https://github.com/jzaefferer/jquery-validation/blob/master/src/core.js
setSinglePattern('Array', checkArray);

setSinglePattern('Email', function( value ) {
    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value)
});

setSinglePattern('Digits', function( value ) {
    return /^\d+$/.test(value);
});

setSinglePattern('Range', function( value, min, max ) {
    return ( value >= min && value <= max );
});

setSinglePattern('Int', checkInt);

//array
// @reference https://github.com/chriso/node-validator/blob/master/lib/validators.js
setSinglePattern('Contains', function( elem, str ) {
    return ( str.indexOf(elem) >= 0 && !!elem );
});

//network
setSinglePattern('URL', function( value ) {
    // from https://github.com/chriso/node-validator/blob/master/lib/validators.js
    return value.length < 2083 && /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i.test(value);
    //return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
});

setSinglePattern('IPv4', function( str ) {
    var result = true;
    if (/^(\d?\d?\d)\.(\d?\d?\d)\.(\d?\d?\d)\.(\d?\d?\d)$/.test(str)) {
        var parts = str.split('.').sort();
        // no need to check for < 0 as regex won't match in that case
        if (parts[3] > 255) {
            result = false;
        }
    } else {
        result = false;
    }
    return result;
});

setSinglePattern('IPv6', function( str ) {
    return /^::|^::1|^([a-fA-F0-9]{1,4}::?){1,7}([a-fA-F0-9]{1,4})$/.test(str);
});

setSinglePattern('IP', function( str ) {
    if (test(str, 'IPv4')) {
        return 4;
    } else if (test(str, 'IPv6')) {
        return 6;
    }
    return false;
});

// @reference https://github.com/chriso/node-validator/blob/master/lib/validators.js#L116
setSinglePattern('Regex', function (str, pattern, modifiers) {
    str += '';
    if (Object.prototype.toString.call(pattern).slice(8, -1) !== 'RegExp') {
        pattern = new RegExp(pattern, modifiers);
    }
    return str.match(pattern);
});

setSinglePattern('NotRegex', function(str, pattern, modifiers) {
    return !getPattern('Regex').test([str, pattern, modifiers]);
});

//export
validation.type.SinglePattern = SinglePattern;