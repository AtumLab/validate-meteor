var validate = validation.get("validate");
var VError = validation.get("Error");
var test = validation.get("test");

Tinytest.add('Validate - Function', function(testTiny){
    try {
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
            e = validate(value, 'Any');
            testTiny.equal(_.isUndefined(e), true, "expected undefined");
        });

        e = validate(12345, 'Number', '{{value}} is not {{ partten }}');
        testTiny.equal(_.isUndefined(e), true, "expected undefined");
        
        e = validate('hoang le', function( value ){
            if(!this.String.test(value))
                throw new VError();
            if(!this.Min.test([value, 6]))
                throw new VError();
            if(!this.Max.test([value, 25]))
                throw new VError();
        });
        testTiny.equal(_.isUndefined(e), true, "expected undefined");

        e = validate(['hoang le', 6], 'Min');
        testTiny.equal(_.isUndefined(e), true, "expected undefined");

        e = validate(123, {
            String: false
        });
        testTiny.equal(_.isUndefined(e), true, "expected undefined");
        
        e = validate('hoang le', [
            'String',
            function(value){
                if(!this.Max.test([value, 25]))
                    throw new VError();
            }
        ]);
        testTiny.equal(_.isUndefined(e), true, "expected undefined");

    }
    catch (err) {
        console.trace(err);
        throw err;
    }
    // Try some invalid
    try {
        e = validate('hoang', function(value){
            throw new VError();
        });
    }
    catch (err) {
        //throw err;
        testTiny.equal(err instanceof VError, true, "expected VError");
    }

    try {
        validate('string', 'Number', '{{value}} is not {{ partten }}');
    }
    catch (err){
        testTiny.equal(err instanceof VError, true, "expected VError");
    }
});

Tinytest.add('Validate - Message', function(testTiny){
    try {
        validate(
            {
                $set: { people: "nice" }
            },
            {
                $set: { people: 'Int' }
            }, "{{value}} {{pattern}} {{path}}");
    }
    catch (e) {
        testTiny.equal(e instanceof VError, true, "expected VError");
        testTiny.equal(e.path, "$set.people", "expected $set.people");
        testTiny.equal(e.value, "nice", "expected nice");
    }
    try {
        validate(
            {
                $set: { people: "nice" }
            },
            'Int', "{{value}} {{pattern}} {{path}}");
    }
    catch (e) {
        console.log(e.getMessage(), 'zzzz');
    }
});

Tinytest.add('Validate - Path', function(testTiny){
    try {
        validate(
            {
                foo:[
                    {bar: "something"}
                ]
            },
            { 
                foo:[
                    { bar: 'Number' }
                ]
            },
            'message'
        );
    }
    catch (err){
        testTiny.equal(err.getPath(), "foo[0].bar", "expected foo[0].bar");
    }
    try {
        validate(
            [
                [
                    [
                        { foo: "something" }
                    ]
                ]
            ],
            [
                [
                    [
                        { foo: 'Int' }
                    ]
                ]
            ]
            ,
            'message'
        );
    }
    catch (err){
        testTiny.equal(err.getPath(), "[0][0][0].foo", "expected [0][0][0].foo");
    }
    try {
        validate(
            {
                fullname: {
                    firstName: [
                        'Le'
                    ]
                }
            },
            {
                fullname: {
                    firstName: [
                        'Int'
                    ]
                }
            },
            'message'
        );
    }
    catch (err){
        testTiny.equal(err.getPath(), "fullname.firstName[0]", "expected fullname.firstName[0]");
    }
});