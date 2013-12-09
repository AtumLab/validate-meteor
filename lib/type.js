/**
 * 
 *
 */
COMPLEXPATTERN = 'COMPLEXPATTERN';
SINGLEPATTERN  = 'SINGLEPATTERN';

validation.type = {};
/**
 *
 */
var patternStore_ = {};
setPattern = function (key, val, force) {
    if(!checkString(key))
        throw new Error('The key must be a string');
    if (checkFunction(val))
        val = new SinglePattern(key, val);

    if(force !== true && patternStore_[key] != null) {
        throw new Meteor.Error(404, 'Unable to set var ' + key + '. Already set.');
    }
    patternStore_[key] = val;
    return val;
}
getPattern = function (key) {
    return patternStore_[key];
}
getPatternStore = function(){
    return patternStore_;
}

/**
 *
 */
Type = function() {
    this.test = function( value ){
        throw new Error('not implemented');
    };
    this.validate = function( value ){
        throw new Error('not implemented');
    },
    this.getDefaultMessage = function( value_ ){
        return 'Invalid '+ this.name + ", got "
                + (value_ instanceof Object ? EJSON.stringify(value_) : value_);
    }
};

//export
validation.config({
    'set': setPattern
});
validation.type.Type = Type;