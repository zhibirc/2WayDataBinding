(function () {
    'use strict';

    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/watch|MDN}
     * @see {@link https://gist.github.com/eligrey/384583|GitHub}
     */
    if ( !Object.prototype.watch ) {
        Object.prototype.watch = function ( prop, cb ) {
            var _prop;

            if ( !(prop in this) ) {
                throw new Error('Absent property in given object');
            }

            if ( typeof cb !== typeof Function ) {
                throw new Error("Callback must be a function");
            }

            // Save old value before redefinition
            _prop = this[prop];

            Object.defineProperty(this, prop, {
                get: function () { return _prop; },
                set: function ( val ) {
                    cb.call(this, prop, _prop, _prop = val);
                }
            });
        };
    }
}());