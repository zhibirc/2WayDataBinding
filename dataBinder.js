(function ( global ) {
    'use strict';

    const GLOBAL_KEY = 'Spy';

    let toString   = Object.prototype.toString,
        isFunction = n => typeof n === 'function',
        isObject   = n => toString.call(n) === toString.call({});

    function Spy ( ...args ) {
        if ( args.length < 2 || args.length > 3 ) { // Less than two or more than three arguments
            throw new Error('Incorrect amount of arguments: two or three allowed');//
        } else if ( args.length === 2 ) { // Two arguments
            if ( !isObject(args[0]) ) {
                throw new Error('Spy applied only for objects');
            } else if ( !isFunction(args[1]) ) {
                throw new Error('Callback must be a function');
            } else {
                // two arguments -- object and callback
            }
        } else { // Three arguments
            if ( !isObject(args[0]) ) {
                throw new Error('Spy applied only for objects');
            } else if ( typeof args[1] !== 'string' && !Array.isArray(args[1]) ) {
                throw new Error('Second argument must be property as a string or an array of properties');
            } else if ( !isFunction(args[2]) ) {
                throw new Error('Callback must be a function');
            } else {
                // three arguments -- object, property/properties and callback
            }
        }


        let _prop;

        // if ( !(prop in this) ) {
        //     throw new Error('Absent property in given object');
        // }

        // Save old value before redefinition
        _prop = this[prop];

        Object.defineProperty(this, prop, {
            get: function () { return _prop; },
            set: function ( val ) {
                cb.call(this, prop, _prop, _prop = val);
            }
        });
    }

    if ( typeof define === 'function' && define.amd ) {
        define(function () {
            return Random;
        });
    } else if ( typeof module !== 'undefined' && typeof require === 'function' ) {
        module.exports = Random;
    } else {
        (function () {
            var oldGlobal = global[GLOBAL_KEY];
            Spy.noConflict = function () {
                global[GLOBAL_KEY] = oldGlobal;
                return this;
            };
        }());
        global[GLOBAL_KEY] = Spy;
    }
}(Function('return this')()));