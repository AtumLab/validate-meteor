var Element = validation.get('Element');

var Model = function( obj ) {
    this._reset();
    if ( this._init ) {
        this._init.apply(this);
    }
    var rule = {};
    _.each(obj, function(type, name){
        rule = {};
        rule[type] = true;
        this.element_[name] = new Element(name, {
            rule : rule
        });
    }, this);
};
Model.prototype = new validation.type.Pattern({});
Model.prototype.constructor = Model;
Model.prototype.name = 'Model';
Model.prototype.addElement = function(name, obj){};
Model.prototype.removeElement = function(){};
Model.prototype.test = function(){};
Model.prototype.validate = function(){};
Model.prototype.transform = function( obj ){};

Model.prototype._reset = function() {
    this.element_ = {};
    this.messages_ = {};
    this.attribute_ = {};
    if(!this.isStarted)
        this.isStarted = false;
    return this;
};

Model.prototype.set = function (object) {
    if (!checkObject(object)) {
        throw new Error('params must be object');
    }
    _.each(object, function(v, k){
        if( this.element_[k].test(v) ) {
            this.attribute_[k] = v;
        }
        else {
            throw new Error('invaild value ' + k);
        }
    }, this);
};
Model.prototype.get = function (name) {
    if (!checkString(name)) {
        throw new Error('params must be string');
    }
    return this.attribute_[name];
};
//export
validation.config({
    'Model': Model
});
validation.type.Model = Model;