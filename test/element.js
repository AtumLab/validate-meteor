var Element = validation.get('Element');

Tinytest.add('Element - Element', function(testTiny){
    try {
        // Style 1
        var username = new Element('Username', {
            required: true,
            rule : {
                //Min: 6,
                //Max: 25,
                String: true
            },
            messages:  {
                //Min: '{{name}} minimum length is 6. Please try again !',
                //Max: '{{name}} maxnimum length is 25. Please try again !',
                //String: '', get as dafault
                check: '{{value}} is exists, please try another !'
            }
        });
        testTiny.equal(username.test('particle4dev'), true, "expected true");
        username.addRule({
            check: function(value){
                return !! Meteor.users.findOne({username: value});
            },
            messages: {
                check: "Username doesnt exists"
            }
        });
        testTiny.equal(username.test('particle4dev'), false, "expected false");
        try {
            username.validate('particle4dev');
        }
        catch (e) {
            testTiny.equal(e.getMessage(), "Username doesnt exists", "expected Username doesnt exists");
        }
        /**
        var elementStyle1 = new Element();
        elementStyle1.setRequired(true);
        elementStyle1.addValidator('String');
        elementStyle1.setValue("hoang le");
        test.equal(elementStyle1.getValue(), "hoang le", "expected string 'hoang le'");

        var elementStyle2 = new Element({
            _init: function(){
                this.setRequired(true).addValidator('Number');
            }
        });
        elementStyle2.setValue(123);
        test.equal(elementStyle2.getValue(), 123, "expected number 123");

        var elementStyle3 = new Element('username', {
            _init: function(){
                this.setRequired(true).addValidator(['String', 6, 10]);
            }
        });
        elementStyle3.setValue("hoang le");
        test.equal(elementStyle3.getValue(), "hoang le", "expected string hoang");
        test.equal(elementStyle3.toJSON(), {username: "hoang le"}, "expected object");

        try {
            var elementStyle4 = new Element('username', {
                _init: function(){
                    this.setRequired(true).addValidator(['String', 6, 10]);
                }
            });
            elementStyle4.setMessage('value {{value}}, pattern {{pattern}}, name {{name}}');
            elementStyle4.setValue("hoang");
        } catch (e) {
            test.equal(e.message, "Validate error: value hoang, pattern String,6,10, name username", "expected string");
        }
        */
    }
    catch (e) {
        throw e;
    }
});