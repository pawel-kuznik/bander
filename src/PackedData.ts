/**
 *  This is a class that wraps around parsed JSON data and allows or deserialization process
 *  to access the original data. We keep it as a class cause we want to have an ability to 
 *  pass it whole, have specific accessors, and allow to detect if packed data is passed
 *  internally in the constructor or other methods participating in the deserialization process.
 */
export class PackedData {

    private _data: any;

    get data() : any { return this._data; }

    constructor(data: any) {
        this._data = data;
    }

    /**
     *  Access a property in the data. This method is useful 
     */
    accessProperty<TPropType = any>(prop: string, validator?: (input: any) => TPropType) : TPropType {

        if (validator) return validator(this._data[prop]);

        return this._data[prop];
    }

    /**
     *  Unpack a property with a specific unpacker function.
     */
    unpackProperty<TPropType = any>(prop: string, unpacker: (input: any) => TPropType) : TPropType {

        return unpacker(this.accessProperty(prop));
    }

    /**
     *  Unpack an array under a specific property.
     */
    unpackArray<TPropType = any>(prop: string, unpacker: (input: any) => TPropType) : TPropType[] {

        return this.accessProperty(prop).map((v: any) => unpacker(v));
    }

    /**
     *  Parse a value under a specific property as an array.
     */
    parseArray<TPropType = any>(prop: string, parser?: (input: any) => TPropType) : TPropType[] {

        const rawValue = this.accessProperty(prop);

        // just fallback on an empty array as we couldn't parse the property
        // as an array.
        if (!Array.isArray(rawValue)) return [];

        if (parser) return rawValue.map((v: any) => parser(v));

        return rawValue;
    }

    /**
     *  Parse a property in the data. This method allows for a fallback value if the property doesn't
     *  exists in the original data.
     */
    parseProperty<TPropType = any>(prop: string, fallback?: TPropType, parser?: (input: any) => TPropType) : TPropType {

        if (!(prop in this._data) && fallback !== undefined) return fallback;

        if (parser) return parser(this._data[prop]);

        return this._data[prop];
    }
 };
