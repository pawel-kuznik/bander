import { PackedData } from "./PackedData";
import { validateString } from "./validators";

describe('Serialization/deserialization use case', () => {

    class Dummy {

        static fromJSON(input: object) : Dummy {
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

    class Dummier extends Dummy {

        static fromJSON(input: object) : Dummier {
            return new Dummier(new PackedData(input));
        };

        private _surname: string;

        get surname() : string { return this._surname; }

        constructor(name: string, surname: string);
        constructor(packed: PackedData);
        constructor(input: string | PackedData, surname: string = '') {

            if (input instanceof PackedData) {
                super(input);
                this._surname = input.accessProperty('surname', validateString);
            }

            else {
                super(input);
                this._surname = surname;
            }
        }

        toJSON() {
            return { ...super.toJSON(), 
                surname: this._surname
            };
        }
    };

    it('should allow for simple class serialization/deserialization', () => {

        const john = new Dummy('john');
        const json = JSON.stringify(john);

        const john2 = Dummy.fromJSON(JSON.parse(json));
        expect(john2.name).toEqual(john.name);
    });

    it('should allow for extended class serialization/deserialization', () => {

        const john = new Dummier('john', 'smith');
        const json = JSON.stringify(john);

        const john2 = Dummier.fromJSON(JSON.parse(json));
        expect(john2.name).toEqual(john.name);
        expect(john2.surname).toEqual(john.surname);
    });
});