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
});