var validate = validation.get('validate');

if (Meteor.isServer) {
    Meteor.methods({
        'validateTestServer' : function(args){
            /**
            validate(args, new pattern({
                firstName: ['String', 4, 6], // min, max
                lastName : ['String', 4, 6], // min, max
            }));
            */
            try {
                validate(args, 'Unknow');
            }
            catch (e) {
                console.log(e);
                throw e;
            }
            return true;
        }
    });
}

if (Meteor.isClient) {
    testAsyncMulti("Meteor.methods - methods", [
        function (testTiny, expect) {
            Meteor.call('validateTestServer', {
                firstName: 'hoang',
                lastName : 'le',
            }, expect(function(err, res){
                console.log(err, 'err');
                console.log(res, 'res');
                testTiny.equal(err instanceof Meteor.Error, true, "expected Meteor.Error");
            }));
        }
    ]);
}