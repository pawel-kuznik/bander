# bander

This is a library that aids to help with serialization and deserialization of objects
in TypeScript/JavaScript. Native code allows for serialiation to JSON with `JSON.stringify()`
and `toJSON()` method. This library provides a way to ease the way back: from string to
an object with state. However, it doesn't force any method or implementation. Instead
it offers a way to control and detect the serialized data object via the `PackedData` class. 

This way the library can remain light and easy to digest and still offer a good level of support
for deserialization.

## usage

```
class Dummy {

    static fromJson(input: object) : Dummy {
        return new Dummy(new PackedData(input));
    };

    private _name: string;

    get name() : string { return this._name; }

    constructor(name: string);
    constructor(packed: PackedData);
    constructor(input: string | PackedData) {

        if (input instanceof PackedData) {
            this._name = input.accessProperty('name', validateString);
        }

        else {
            this._name = input;
        }
    }

    toJSON() {
        return {
            name: this._name
        };
    }
};
```

Above code allows to serialize and deserialize Dummy class instances. In this particular implementation
the class exposes a static `Dummy.fromJSON()` method. Meaning that it's possible to call it line:

```
const john = new Dummy('John');
const jsonString = JSON.stringify(john);

// do processing or transfer data

const john = Dummy.fromJSON(JSON.parse(jsonString));

// and we we have a valid Dummy instance
```

Of course, the actual API of the deserialization or serialization can be differen. For example the `Dummy`
class could have a serialize/deserialize methods instead of toJSON/fromJSON methods. 