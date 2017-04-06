#get-all-property-names [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

[![npm install get-all-property-names](https://nodei.co/npm/get-all-property-names.png?mini=true)](https://npmjs.org/package/get-all-property-names/)

Get all property names of an object/function/class including non-enumerable and inherited ones.

Is similar to `Object.getOwnPropertyNames()` but traverses up all the prototype chain 
of object/function/class.

All properties and methods starting and ending with `__`, such as `__defineGetter__`, are removed.
All methods and properties from Object will be removed if not are overwritten.

## Example

```js
class A {
    metA(){}
}

class B extends A {
    metB() {}
}

class C extends B {
    metC() {}
}

console.log(Object.getOwnPropertyNames(C)); // [ "metC" ]
console.log(getAllPropertyNames(C)); // [ "metA","metB", "metC" ]
```
