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
});