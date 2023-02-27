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
 };
