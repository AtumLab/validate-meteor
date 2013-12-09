Tinytest.add('Inherits - Inherits', function(testTiny){
    try {
        var singlePattern = new validation.type.SinglePattern('name', function(){});
        testTiny.equal((singlePattern instanceof validation.type.Type), true, "expected true");
        testTiny.equal((singlePattern instanceof validation.type.SinglePattern), true, "expected true");

        var complexPattern = new validation.type.ComplexPattern('name', function(){});
        testTiny.equal((complexPattern instanceof validation.type.Type), true, "expected true");
        testTiny.equal((complexPattern instanceof validation.type.ComplexPattern), true, "expected true");

        var optional = new validation.type.Optional('String', function(value){
            return true;
        });
        testTiny.equal((optional instanceof validation.type.Type), true, "expected true");
        testTiny.equal((optional instanceof validation.type.ComplexPattern), true, "expected true");
        testTiny.equal((optional instanceof validation.type.Optional), true, "expected true");
        testTiny.equal((optional instanceof validation.type.SinglePattern), false, "expected false");

        var pattern = new validation.type.Pattern({});
        testTiny.equal((pattern instanceof validation.type.Type), true, "expected true");
        testTiny.equal((pattern instanceof validation.type.ComplexPattern), true, "expected true");
        testTiny.equal((pattern instanceof validation.type.Pattern), true, "expected true");
        testTiny.equal((pattern instanceof validation.type.Optional), false, "expected false");
        testTiny.equal((pattern instanceof validation.type.SinglePattern), false, "expected false");

        var model = new validation.type.Model({});
        testTiny.equal((model instanceof validation.type.Type), true, "expected true");
        testTiny.equal((model instanceof validation.type.ComplexPattern), true, "expected true");
        testTiny.equal((model instanceof validation.type.Pattern), true, "expected true");
        testTiny.equal((model instanceof validation.type.Optional), false, "expected false");
        testTiny.equal((model instanceof validation.type.SinglePattern), false, "expected false");

        var element = new validation.type.Element({});
        testTiny.equal((element instanceof validation.type.Type), true, "expected true");
        testTiny.equal((element instanceof validation.type.ComplexPattern), true, "expected true");
        testTiny.equal((element instanceof validation.type.Pattern), true, "expected true");
        testTiny.equal((element instanceof validation.type.Optional), false, "expected false");
        testTiny.equal((element instanceof validation.type.SinglePattern), false, "expected false");

    }
    catch(err){
        throw err;
    }
});