var Optional = validation.get("Optional"),
validate = validation.get("validate"),
test = validation.get("test"),
VError = validation.get("Error");

Tinytest.add('Optional - Optional', function(testTiny){
    var optional = new Optional('Digits', 'String');
    var e = test(1234567, optional);
    testTiny.equal(e, true, "expected true");

    optional = new Optional('String', function(value){
        return this.Digits.test(value);
    });
    e = test(1234567, optional);
    testTiny.equal(e, true, "expected true");
});