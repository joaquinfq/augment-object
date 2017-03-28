#augment-object [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Augment selectively an object.

## Object

```js
const src = {
    a1 : 1,
    a2 : 2,
    b  : 3,
    c  : 4
};
const dst = {
    a1 : 7,
    a2 : 8
};
console.log(
    augmentObject(
        {
            filter : (name) => name[0] !== 'a'
        },
        {},
        src
    )
); // { a1 : 7, a2 : 8, b : 3, c : 4 }
```

## Classes

Augment selectively the prototype of a class.

Sometimes you have a class definition from other library and 
you need some methods of this class but there is no mixins neither multiple
inheritance in JS:

```js
class BaseClassFromMyLib {
    action()
    {
        // do action
    }
    log()
    {
        // log messages
    }
}
class ExternalClass {
    scan()
    {
        // scan files and show logs
    }
    log()
    {
        // log messages
    }
}
class MyLibClass extends BaseClassFromMyLib {
    scan()
    {
        // scan files
    }
}
```

In this case, i need `scan` (and its dependences) from ExternalClass but `log` 
(and other methods) from my base class.

Any of other libs for merging/assigning properties in npm will overwrite `log` 
from base class. So i created `augmentClass` for merging properties selectively.

```js
class MyLibClass extends BaseClassFromMyLib {
    // Other methods
}
augmentClass(
    MyLibClass, 
    {
        // You can use a filter function to say when to overwrite.
        // filter : (name, dstClassProto, srcClassProto) => {
        //    // return `true` if property `name` must be overwrite.
        // }
    }, 
    ExternalClass/*,
    OtherClass,
    MoreOtherClass,
    etc,
    */
);
```

If you need call overwritten method, `super.log()` in example, then you 
need a mixin and `augmentClass` will not be useful.
