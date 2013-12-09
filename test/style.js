var validate = validation.get("validate"),
test = validation.get("test"),
VError = validation.get("Error");

Tinytest.add('Unknow - Type', function(test){
    try {
        validate('value', 'Unknow');
    }
    catch (e) {
        test.equal(e instanceof VError, true, "expected VError");
        test.equal(e.message, "Bad pattern: unknown pattern type", "expected right message");
    }
});

Tinytest.add('Style - (value, type)', function(testTiny){
    var e = test('string', 'Int');
    testTiny.equal(e, false, "expected false");
    e = validate('string', 'String');
    testTiny.equal(_.isUndefined(e), true, "expected undefined");
});

Tinytest.add('Style - (value, function)', function(testTiny){
    var e = test('string', function(value){
        if(this.String.test(value))
            return true;
        return false;
    });
    testTiny.equal(e, true, "expected true");
    e = validate('string', function(value){
        if(!this.String.test(value))
            throw new VError('{{value}} is not {{pattern}}');
    });
    testTiny.equal(_.isUndefined(e), true, "expected undefined");
});

Tinytest.add('Style - (object, object)', function(testTiny){
    var pattern = { name: 'String' }, e;
    e = test({name: 'le'}, pattern);
    testTiny.equal(e, true, "expected true");
    e = validate({name: 'le'}, pattern);
    testTiny.equal(_.isUndefined(e), true, "expected undefined");
});

Tinytest.add('Style - (value, object)', function(testTiny){
    var pattern = { 'String': false }, e;
    e = test(123, pattern);
    testTiny.equal(e, true, "expected true");
    e = validate(123, pattern);
    testTiny.equal(_.isUndefined(e), true, "expected undefined");
});

Tinytest.add('Style - (value, array)', function(testTiny){
    var pattern = ['Int', 'Number', 'Digits'], e;
    e = test(123, pattern);
    testTiny.equal(e, true, "expected true");
    e = validate(123, pattern);
    testTiny.equal(_.isUndefined(e), true, "expected undefined");
});