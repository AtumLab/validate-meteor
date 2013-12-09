var validate = validation.get("validate"),
test = validation.get("test"),
VError = validation.get("Error");

var Element = function(name, obj){
    this._reset();
    if(!checkObject(obj))
        throw new Error('obj must be object');
    if(obj.rule)
        this.rule_ = obj.rule;
    if(obj.messages)
        this.messages_ = obj.messages;
    if ( this._init )
        this._init.apply(this);
};
Element.prototype = new validation.type.Pattern({});
Element.prototype.constructor = Element;
Element.prototype.name = 'Element';

Element.prototype._init = function(){
    if(!this.isStarted){
        // to do something

        this.isStarted = true;
    }
};
Element.prototype._reset = function() {
    this.rule_ = {};
    this.messages_ = {};
    this.required = false;
    this.name = null;
    if(!this.isStarted)
        this.isStarted = false;
    return this;
};
Element.prototype.addRule = function(obj){
    if( !checkObject(obj) )
        throw new Error('obj must be object');
    var self = this;
    _.each(obj, function(v, k){
        if( k == 'messages' )
            _.extend(self.messages_, v);
        else
            self.rule_[k] = v;
    });
};
Element.prototype.removeRule = function( name ){
    if(!name)
        // remove all
        this.rule_ = {};
};
Element.prototype.setRequired = function( bool ){
    this.required = bool;
    return this;
};
Element.prototype.test = function( value ){
    return test(value, this.rule_);
};
Element.prototype.validate = function( value ){
    var self = this;
    try {
        validate(value, self.rule_);
    }
    catch (e) {
        if(self.messages_[e.path])
            e.setMessage(self.messages_[e.path]);
        throw e;
    }
};
Element.prototype.transform = function( value ){
    this.validate( value );
    return value;
}

//export
validation.config({
    'Element': Element
});
validation.type.Element = Element;