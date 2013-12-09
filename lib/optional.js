/**
 * Optional class is ...
 * @constructor
 * @extends {ComplexPattern}
 */
var Optional = function(){
    this.pattern = Array.prototype.slice.call(arguments, 0);
}
Optional.prototype = new validation.type.ComplexPattern('Optional', function(){});
Optional.prototype.constructor = Optional;
Optional.prototype.getPattern = function(){
    return this.pattern;
};

var argOptional = [];
function passedOptional(element, index, array) {
    if(checkFunction(element))
        return element.call(getPatternStore(), argOptional);
    else if(checkString(element)){
        return getPattern(element).test(argOptional);
    }
    // alway true?
    return true;
}
Optional.prototype.test = function( args ){
    argOptional = args;
    return this.getPattern().some(passedOptional);
}

//export
validation.config({
    'Optional': Optional
});
validation.type.Optional = Optional;