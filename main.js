(function () {
    'use strict';
    
    var doc = document,
        stdin = doc.getElementById('stdin'),
        stdout = doc.getElementById('stdout'),
        user = new User('John', 28, function ( name ) { stdout.value = name; });
    
    stdin.addEventListener('input', function () {
        user.name = this.value;
    }, !1);

    // Example #1
    setTimeout(function () {
        user.name = 'Bruce';
    }, 1e4);

    user.watch('age', function () { alert([].slice.call(arguments)); });

    // Example #2
    setTimeout(function () {
        user.age = 30;
    }, 5e3);
}());