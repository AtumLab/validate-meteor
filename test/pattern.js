var Pattern =  validation.get("Pattern"),
validate = validation.get("validate"),
test = validation.get("test");

Tinytest.add('Pattern - Pattern', function(testTiny){
    try {
        SEX = ['Male', 'Female'];
        var myfn = new Pattern('AccountModel', {
            'firstName': 'String',
            'lastName' : 'String',
            'getName'  : 'Function',
            'sex'      : function(value){
                if (! _.contains(SEX, value))
                    return false;
                return true;
            }
        }, true);

        var e = test({
            'firstName': 'lenam',
            'lastName' : 'hoang',
            'getName' : function(){
                return this.firstName + " " + this.lastName;
            },
            'sex' : 'Male'
        }, myfn);
        testTiny.equal(e, true, "expected true");

        e = test({
            'firstName': 'lenam',
            'lastName' : 'hoang',
            'getName' : function(){
                return this.firstName + " " + this.lastName;
            },
            'sex' : 'Male'
        }, 'AccountModel');
        testTiny.equal(e, true, "expected true");

        /**
        e = validate({
            'firstName': 'hoang',
            'lastName' : 'le234'
        }, new Pattern({
            firstName: 'String',
            lastName : 'String',
        }));
        test.equal(_.isUndefined(e), true, "expected undefined");
        */
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});