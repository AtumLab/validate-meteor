var test = validation.get("test");

Tinytest.add('Any - Pass', function(testTiny){
    try {
        var e;
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
    }
    catch (e) {
        testTiny.equal(_.isUndefined(e), true, "expected undefined : " + e.message);
    }
});

Tinytest.add('Email - Pass', function(testTiny){
    //Try some invalid emails
    [
        'invalidemail@',
        'invalid.com',
        '@invalid.com'
    ].forEach(function(email) {
        var e = test(email, 'Email');
        testTiny.equal(e, false, "expected false");
    });

    //Now try some valid ones
    [
        'foo@bar.com',
        'x@x.x',
        'foo@bar.com.au',
        'foo+bar@bar.com'
    ].forEach(function(email) {
        var e = test(email, 'Email');
        testTiny.equal(e, true, "expected true");
    });
});

Tinytest.add('URL - Pass', function(testTiny){
    //Try some invalid URLs
    [
        'xyz://foobar.com', //Only http, https and ftp are valid
        'invalid/',
        'invalid.x',
        'invalid.',
        '.com',
        'http://com/',
        'http://300.0.0.1/',
        'mailto:foo@bar.com'
    ].forEach(function(url) {
        var e = test(url, 'URL');
        testTiny.equal(e, false, "expected false" + url);
    });

    //Now try some valid ones
    [
        'foobar.com',
        'www.foobar.com',
        'foobar.com/',
        'valid.au',
        'http://www.foobar.com/',
        'https://www.foobar.com/',
        'ftp://www.foobar.com/',
        'http://www.foobar.com/~foobar',
        'http://user:pass@www.foobar.com/',
        'http://127.0.0.1/',
        'http://10.0.0.0/',
        'http://189.123.14.13/',
        'http://duckduckgo.com/?q=%2F',
        'http://foobar.com/t$-_.+!*\'(),',
        'http://localhost:3000/'
    ].forEach(function(url) {
        var e = test(url, 'URL');
        testTiny.equal(e, true, "expected true" + url);
    });
});

Tinytest.add('Int - Pass', function(testTiny){
    //Try some invalid Int
    ['01', '-01', '000', '100e10', '123.123', '  ', ''].forEach(function(str) {
        var e = test(str, 'Int');
        testTiny.equal(e, false, "expected false" + str);
    });
    //Now try some valid ones
    [
        '13',
        '123',
        '0',
        0,
        123,
        '-0'
    ].forEach(function(str) {
        var e = test(str, 'Int');
        testTiny.equal(e, true, "expected false" + str);
    });
});

Tinytest.add('String - Pass', function(testTiny){
    //Try some valid String
    ['abc', '01', '-01', '000', '100e10', '123.123', '  ', ''].forEach(function(str) {
        var e = test(str, 'String');
        testTiny.equal(e, true, "expected true " + str);
    });

    //invalid
    [
        null,
        [],
        {},
        true,
        123,
        undefined
    ].forEach(function(str) {
        var e = test(str, 'String');
        testTiny.equal(e, false, "expected false " + str);
    });

    //[string, min, max]
    //Try some valid String
    [
        ['abc', 0, 3], 
        ['hello', 4, 5], 
        ['the notebook', 10, 30]
    ].forEach(function(str) {
        var e = test(str, 'String');
        testTiny.equal(e, true, "expected true " + str);
    });

    //invalid
    [
        ['abc', 4, 7], 
        ['hello hello', 4, 5]
    ].forEach(function(str) {
        var e = test(str, 'String');
        testTiny.equal(e, false, "expected false " + str);
    });

});

//http://es5.github.io/#x11.4.3
Tinytest.add('Object - Pass', function(testTiny){
    //Try some invalid
    ['string', undefined, 123, true, '', null, [], function(){}].forEach(function(str) {
        var e = test(str, 'Object');
        testTiny.equal(e, false, "expected false" + str);
    });
    //Now try some valid ones
    [
        {},
        {
            firstName: 'hoang',
            lastName: 'le'
        }
    ].forEach(function(str) {
        var e = test(str, 'Object');
        testTiny.equal(e, true, "expected true" + str);
    });
});

Tinytest.add('Number - Pass', function(testTiny){
    //Try some invalid
    ['string', undefined, true, '', null, [], function(){}].forEach(function(str) {
        var e = test(str, 'Number');
        testTiny.equal(e, false, "expected false" + str);
    });
    //Now try some valid ones
    [
        123455,
        123.123,
        -23,
        100e10,
        NaN // A value representing Not-A-Number
    ].forEach(function(str) {
        var e = test(str, 'Number');
        testTiny.equal(e, true, "expected true" + str);
    });
});

Tinytest.add('Digits - Pass', function(testTiny){
    // the digits are the elements of the set {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
    //Try some invalid
    ['string', undefined, true, '', null, [], function(){}, 123.123, -23, NaN].forEach(function(str) {
        var e = test(str, 'Digits');
        testTiny.equal(e, false, "expected false" + str);
    });
    //Now try some valid ones
    [
        123455,
        100e10        
    ].forEach(function(str) {
        var e = test(str, 'Digits');
        testTiny.equal(e, true, "expected true" + str);
    });
});

Tinytest.add('Regex - Pass', function(testTiny){
    // valid
    var result = test( ['abc', /a/], "Regex" );
    testTiny.equal(!_.isNull(result), true, "expected true");
    result = test( ['abc', /^abc$/], "Regex" );
    testTiny.equal(!_.isNull(result), true, "expected true");
    result = test( ['abc', 'abc'], "Regex" );
    testTiny.equal(!_.isNull(result), true, "expected true");
    result = test( ['ABC', /^abc$/i], "Regex" );
    testTiny.equal(!_.isNull(result), true, "expected true");
    result = test( ['ABC', 'abc', 'i'], "Regex" );
    testTiny.equal(!_.isNull(result), true, "expected true");
    result = test( [12390947686129, /^[0-9]+$/], "Regex" );
    testTiny.equal(!_.isNull(result), true, "expected true");

    // invalid
    result = test( [123, /^1234$/], "Regex" );
    testTiny.equal(_.isNull(result), true, "expected true");
});

Tinytest.add('NotRegex - Pass', function(testTiny){
    // valid
    var result = test( ['foobar', /e/], "NotRegex" );
    testTiny.equal(result, true, "expected true");
    result = test( ['ABC', 'abc'], "NotRegex" );
    testTiny.equal(result, true, "expected true");
    result = test( [12390947686129, /a/], "NotRegex" );
    testTiny.equal(result, true, "expected true");

    // invalid
    result = test( [123, /^1234$/], "NotRegex" );
    testTiny.equal(result, true, "expected true");
});