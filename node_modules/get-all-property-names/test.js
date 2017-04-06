const assert = require('assert');
const getAllPropertyNames = require('./index');
class A {
    metA(){}
}

class B extends A {
    metB() {}
}

class C extends B {
    metC() {}
}

assert.deepEqual(Object.getOwnPropertyNames(C.prototype), [ 'constructor', 'metC' ]);
assert.deepEqual(getAllPropertyNames(C.prototype), [ 'constructor', 'metA', 'metB', 'metC' ]);
