var VError = validation.get("Error"),
test = validation.get("test"),
Optional = validation.get("Optional"),
Pattern = validation.get("Pattern");
/**
 * 
 * @param {object| } value_
 * @param {object| string} pattern_
 * @param {string| error} error
 * @return {boolean} 
 *
 */
validate = function (value_, pattern_, message) {
    try {
        var error = null;
        if(checkString(message))
            error = new VError(message);
        else
            error = new VError('');
        validateSubtree(value_, pattern_, error);
    }
    catch (err) {
        /**
        if ((err instanceof VError) && err.path)
            err.message += " in field " + err.path;
        if(checkString(pattern_))
            err.errorType = "Validate." + pattern_;
        */
        throw err;
    }
}
var validateSubtree = function(value_, pattern_, error){
    try {
        var patternTest, result = null;
        // for string
        if(checkString(pattern_)){
            patternTest = getPattern(pattern_);
            if(!patternTest){
                //not founded
                error.setMessage("Bad pattern: unknown pattern type");
                throw error;
            }
            result = patternTest.test( value_ );
        }



        // for function
        else if(checkFunction(pattern_)){
            pattern_.call(getPatternStore(), value_);
            return ;
        }
        // for array
        else if(checkArray(pattern_)){
            if(checkArray(value_)) {
                _.each(value_, function(v, k){
                    try {
                        //console.log(v, k, pattern_[k], pattern_, 'pattern_[k]');
                        validateSubtree(v, pattern_[k], error);
                    }
                    catch (err){
                        // add path
                        err.addPath(k);
                        if(!err.value)
                            err.value = v;
                        if(!err.pattern)
                            err.pattern = pattern_[k];
                        throw err;
                    }
                });
            }
            else {
                result = pattern_.every(function(element, index, array){
                    try {
                        validateSubtree(value_, element, error);
                        return true; // need to return true
                    }
                    catch (err) {
                        throw err;
                    }
                });
            }
        }
        // for object
        else if(checkObject(pattern_)){
            if (pattern_ instanceof Optional) {
                result = pattern_.test(value_);
            }
            else {
                if(checkObject(value_)){
                    if(value_ )
                    _.each(value_, function(v, k){
                        try {
                            //console.log(v, k, pattern_[k], pattern_, 'pattern_[k]');
                            validateSubtree(v, pattern_[k], error);
                        }
                        catch (err){
                            // add path
                            console.log(k, err);
                            err.addPath(k);
                            if(!err.value)
                                err.value = v;
                            if(!err.pattern)
                                err.pattern = pattern_[k];
                            throw err;
                        }
                    });
                }
                else
                    _.each(pattern_, function(v, k){
                        if(!test(value_, k, v) && result !== false){
                            result = false; // stop loop
                            error.addPath(k);
                        }
                    });
            }
            if(result === null)
                result = true;
        }
        else
            patternTest = pattern_;

        if(result === null)
            result = patternTest.test( value_ );

        if(result !== true) {
            throw error;
        }
    }
    catch (err) {
        throw err;
    }
}

validation.config({
    'validate': validate
});