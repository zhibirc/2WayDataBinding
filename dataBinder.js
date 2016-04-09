/**
 * Spy/track/watch property changes in objects and bind UI reaction to them with callbacks.
 *
 * @author Yaroslav Surilov (zhibirc)
 * @version 1.0.0
 */
(function ( global ) {
    'use strict';

    const GLOBAL_KEY = 'Spy';

    let toString    = Object.prototype.toString,
        isFunction  = n => typeof n === 'function',
        isObject    = n => toString.call(n) === toString.call({}),
        isImmutable = n => Object.isFrozen(n) || Object.isSealed(n);

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
                let targetObject = args[0],
                    cb = args[1];

                if ( isImmutable(targetObject) ) {
                    throw new Error('Spy doesn\'t work with immutable objects');
                } else {
                    Object.keys(targetObject).forEach(key => {
                        if ( !Object.getOwnPropertyDescriptor(targetObject, key).configurable ) {
                            console.warn('Property ' + key + ' can not be tracked');
                        } else {
                            spyOne.call(targetObject, key, cb);
                        }
                    });
                }
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
                let targetObject = args[0],
                    props = [].concat(args[1]),
                    cb = args[2],
                    hasOwn = Object.prototype.hasOwnProperty;

                if ( isImmutable(targetObject) ) {
                    throw new Error('Spy doesn\'t work with immutable objects');
                } else {
                    props.forEach(prop => {
                        if ( hasOwn.call(targetObject, prop ) ) {
                            if ( !Object.getOwnPropertyDescriptor(targetObject, prop).configurable ) {
                                console.warn('Property ' + prop + ' can not be tracked');
                            } else {
                                spyOne.call(targetObject, prop, cb);
                            }
                        } else {
                            console.warn('Tracked object hasn\'t property ' + prop);
                        }
                    });
                }
            }
        }

        /**
         * Spy individual object property.
         *
         * @param {string} prop property name
         * @param {Function} cb callback
         */
        function spyOne ( prop, cb ) {
            let oldValue;

            // Save old value before redefinition
            oldValue = this[prop];

            Object.defineProperty(this, prop, {
                get: function () { return oldValue; },
                set: function ( newValue ) {
                    if ( isEqual(oldValue, newValue ) ) {
                        return;
                    }
                    cb.call(this, prop, oldValue, oldValue = newValue);
                }
            });
        }

        /**
         * Utility helper for checking entities equality
         *
         * @param {*} a first entity
         * @param {*} b second entity
         */
        function isEqual ( a, b ) {
            return JSON.stringify(a) === JSON.stringify(b);
        }
    }

    try {
        if ( typeof define === 'function' && define.amd ) {
            define(function () {
                return Spy;
            });
        } else if ( typeof module !== 'undefined' && typeof require === 'function' ) {
            module.exports = Spy;
        }
    } catch ( ex ) {
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