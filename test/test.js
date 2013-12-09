var test = validation.get("test"),
Optional = validation.get("Optional"),
Pattern = validation.get("Pattern");

Tinytest.add('Test - (value, string)', function(testTiny){
    var e;
    // Try some valid
    [
        'foo@bar.com', //string
        {}, //object,
        [], //array
        123, //number
        true, //boolean
        null,
        undefined
    ].forEach(function(value) {
        e = test(value, 'Any');
        testTiny.equal(e, true, "expected true");
    });
});

Tinytest.add('Test - (value, function)', function(testTiny){
    var e;
    e = test('hoang le', function( value ){
        if(!this.String.test(value))
            return false;
        if(!this.Min.test([value, 6]))
            return false;
        if(!this.Max.test([value, 25]))
            return false;
        return true;
    });
    testTiny.equal(e, true, "expected true");
    // Try some invalid
    e = test('hoang', function(value){
        return false;
    });
    testTiny.equal(e, false, "expected true");
});

Tinytest.add('Test - (array, string) mutil args', function(testTiny){
    e = test(['hoang le', 10], 'Min', false);
    testTiny.equal(e, true, "expected true");
});

Tinytest.add('Test - (value, object)', function(testTiny){
    e = test(123, {
        String: false
    });
    testTiny.equal(e, true, "expected true");
});

Tinytest.add('Test - (value, array)', function(testTiny){
    e = test('hoang le', [
        'String',
        function(value){
            if(!this.Max.test([value, 25]))
                return false;
            return true;
        }
    ]);
    testTiny.equal(e, true, "expected true");    
});

Tinytest.add('Test - (object, object)', function(testTiny){
    e = test({
        firstName: 'hoang',
        lastName: 'le',
        age: 23
    },{
        firstName: 'String',
        lastName: 'String',
        age: 'Int'
    });
    testTiny.equal(e, true, "expected true");    
});

Tinytest.add('Test - (value, Optional)', function(testTiny){
    var optional = new Optional('String', function(value){
        return this.Digits.test(value);
    });
    var e = test(1234567, optional);
    testTiny.equal(e, true, "expected true");
});

Tinytest.add('Test - (value, Pattern)', function(testTiny){
    var SEX = ['Male', 'Female'], e;
    var AccountModel = new Pattern({
        'firstName': 'String',
        'lastName' : 'String',
        'getName'  : 'Function',
        'sex'      : function(value){
            if (! _.contains(SEX, value))
                throw new VError(403, "value don't match");
        }
    });
    e = test({
        'firstName': 'lenam',
        'lastName' : 'hoang',
        'getName' : function(){
            return this.firstName + " " + this.lastName;
        },
        'sex' : 'Male'
    }, AccountModel);
    testTiny.equal(e, true, "expected true");
});