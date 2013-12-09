/**
 * 
 * @param {object| } value_
 * @param {object| } pattern_
 * @param {boolean} exp
 * @return {boolean} 
 * 
 */
var Optional = validation.get("Optional"),
Pattern = validation.get("Pattern");

var test = function (value_, pattern_, exp) {
    var patternTest, result = null;
    // for string
    if(checkString(pattern_)){
        patternTest = getPattern(pattern_);
        if(!patternTest) //not founded
            return false;
        result = patternTest.test( value_ );
    }
    // for function
    else if(checkFunction(pattern_)){
        result = pattern_.call(getPatternStore(), value_);
    }
    // for array
    else if(checkArray(pattern_)){
        result = pattern_.every(function(element, index, array){
            return test(value_, element) === true;
        });
    }
    // for object
    else if(checkObject(pattern_)){
        if (pattern_ instanceof Optional || pattern_ instanceof Pattern) {
            result = pattern_.test(value_);
        }
        else {
            if(checkObject(value_))
                _.each(value_, function(v, k) {
                    if(!test(v, pattern_[k]) && result !== false){
                        result = false; // stop loop
                    }
                });
            else
                _.each(pattern_, function(v, k){
                    if(!test(value_, k, v) && result !== false){
                        result = false; // stop loop
                    }
                });
            if(result === null)
                result = true;
        }
    }


    if( exp === void 0 )
        return result;
    return (exp == result);
};
validation.config({
    'test': test
});