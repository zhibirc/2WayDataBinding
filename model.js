function User(name, age, cb) {
    'use strict';

    var _name;

    if (!(this instanceof User)) {
        return new User();
    }

    this.id = ~~(Math.random() * 1e3);

    // Property for future tests
    this.age = age;

    // "Sensitive" property, when changed -- UI changed by callback.
    Object.defineProperty(this, 'name', {
        get: function () { return _name; },
        set: function ( val ) {
            _name = val;
            cb(_name);
        }
    });
}