var set = validation.get('set'),
test = validation.get('test'),
validate = validation.get('validate');

Tinytest.add('SinglePattern - Pass', function(testTiny){
    set('EqualTo10', function(value){
        if(value != 10)
            return false;
        return true;
    }, true);
    
    // test
    var e = test(10, 'EqualTo10');
    testTiny.equal(e, true, "expected true");
    e = test(11, 'EqualTo10');
    testTiny.equal(e, false, "expected false");

    // validate
    
});