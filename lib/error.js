/**
 * 
 *
 */
var pathRegex = /{{path}}/i,
valueRegex = /{{value}}/i,
patternRegex = /{{pattern}}/i,
nameRegex = /{{name}}/i;

var VError = Meteor.makeErrorType("Validation.Error", function (msg) {
    var self = this;
    self.errorType = 400;
    self.message = msg;
    // E.g.: "vals[3].entity.created"
    self.path = "";

    self.pattern = msg;
    self.value = null;

    self.addPath = function(key){
        if(checkInt(key))
            key = "[" + key + "]";
        else if (!key.match(/^[a-z_$][0-9a-z_$]*$/i)) // none of (a-z) (_) ($) and (0-9) (a-z) (_) ($) why ???
            key = JSON.stringify([key]);
        
        if (self.path && self.path[0] !== "[")
            self.path = key + '.' + self.path;
        else
            self.path = key + self.path;
    };

    self.parsePath = function(){
        self.message = self.message.replace(pathRegex, self.path);
        self.sanitizedError.message = self.message;
        return self;
    };
    self.parseValue = function(){
        self.message = self.message.replace(valueRegex, self.value);
        self.sanitizedError.message = self.message;
        return self;
    };
    self.parsePattern = function(){
        self.message = self.message.replace(patternRegex, self.pattern);
        self.sanitizedError.message = self.message;

        return self;
    };
    self.getPath = function(){
        self.parsePath();
        return self.path;
    };
    self.getMessage = function(){
        self.parsePath().parseValue().parsePattern();
        return self.message;
    };
    self.setMessage = function( m ){
        self.message = m;
        self.sanitizedError.message = self.message;
    };
    // If self gets sent over DDP, don't give full internal details but at least provide something better than 500 Internal server error.
    // new Meteor.Error(error(404), reason, details)
    self.sanitizedError = new Meteor.Error(400, "Validate failed", self.message);
});

validation.config({
    'Error': VError
});