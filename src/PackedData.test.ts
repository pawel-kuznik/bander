import { PackedData } from "./PackedData";

describe('PackadData', () => {

    it('should allow access to data', () => {

        const input = { name: 'johnny' };
        const packed = new PackedData(input);

        expect(packed.data).toEqual(input);
    });

    it('should allow accessing properties', () => {

        const input = { name: 'johnny' };
        const packed = new PackedData(input);

        expect(packed.accessProperty('name')).toEqual('johnny');
    });

    it('should allow accessing data with a validator', () => {

        const input = { name: 'johnny' };
        const packed = new PackedData(input);

        const validateString = (input: any) : string => {

            if (typeof(input) !== 'string') throw Error('Not a string');
            return input;
        };

        const validated:string = packed.accessProperty('name', validateString);
        expect(validated).toEqual('johnny');
    });

    it('should allow unpacking a property', () => {

        const input = { actor: { name: 'johnny' } };
        const packed = new PackedData(input);

        const unpacker = (input: any) : string => {
            return input.name;
        };

        const unpacked = packed.unpackProperty("actor", unpacker);
        expect(unpacked).toEqual("johnny");
    });

    it('should allow unpacking a whole array', () => {

        const input = { actors: [ { name: "John" }, { name: "Bob" } ]};
        const packed = new PackedData(input);

        const unpacker = (input: any) : string => {
            return input.name;
        };

        const unpacked = packed.unpackArray("actors", unpacker);

        expect(unpacked.length).toEqual(2);
        expect(unpacked.find(u => u === "John")).toBeTruthy();
        expect(unpacked.find(u => u === "Bob")).toBeTruthy();
    });

    it('should allow for parsing a property with a fallback', () => {

        const input = { foo: "baz" };
        const packed = new PackedData(input);

        const value = packed.parseProperty("missing", 50);
        expect(value).toEqual(50);

        const value2 = packed.parseProperty("foo", 50);
        expect(value2).toEqual("baz");
    });

    it("should allow for parsing an array", () => {

        const input = { foo: [ "baz" ] };
        const packed = new PackedData(input);

        const value = packed.parseArray("missing");
        expect(Array.isArray(value)).toEqual(true);

        const value2 = packed.parseArray("foo");
        expect(value2).toContain("baz");

        const value3 = packed.parseArray("foo", (s) => `${s}+2`);
        expect(value3).toContain("baz+2");
    });
});