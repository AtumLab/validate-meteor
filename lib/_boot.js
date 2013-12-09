/**
 * 
 * @stable
 */
validation = {};
validation.VERSION = 0.1;

/**
 * Check if parameter is string.
 * @param {String} obj Value need to check.
 * @return {boolean}
 * @reference https://github.com/jzaefferer/jquery-validation/blob/master/src/core.js
 */
checkString = function(obj){
    return (Object.prototype.toString.call(obj) == '[object String]');
};
checkArray = function(val) {
    return val &&
        typeof(val) === 'object' &&
        typeof(val.length) === 'number' &&
        typeof(val.splice) === 'function' &&
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable
        !(val.propertyIsEnumerable('length'));
};
checkFunction = function(obj){
    return (Object.prototype.toString.call(obj) == '[object Function]');
};
checkObject = function(value){
    return value !== null && typeof value === 'object';
};
checkInt = function(str) {
    return !!(''+str).match(/^(?:-?(?:0|[1-9][0-9]*))$/);
};