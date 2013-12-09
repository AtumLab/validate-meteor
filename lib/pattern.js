var test,
lazyLoadingTest = function(){
    if(!test)
        test = validation.get('test');
    return test;
};

var Pattern = function(name, pattern, save){
    if( checkString(name) )
        this.name = name;
    if( checkObject(name) )
        this.pattern = name;
    if( checkObject(pattern) )
        this.pattern = pattern;
    if( save === true )
        setPattern(name, this);
};
Pattern.prototype = new validation.type.ComplexPattern('Pattern', function(){});
Pattern.prototype.constructor = Pattern;
Pattern.prototype.getPattern = function(){
    return this.pattern;
};
Pattern.prototype.transform = function(){

};
Pattern.prototype.test = function( value_ ){
    var result = null, pattern_ = this.getPattern();
    if(!lazyLoadingTest())
        throw new Error('test function does not exist');

    _.each(value_, function(v, k) {
        if(!test(v, pattern_[k]) && result !== false){
            result = false; // stop loop
        }
    });
    if(result === null)
        result = true;
    return result;
};
Pattern.prototype.validate = function( value ){};
Pattern.prototype.get = function(){};
Pattern.prototype.set = function(){};

//export
validation.config({
    'Pattern': Pattern
});
validation.type.Pattern = Pattern;