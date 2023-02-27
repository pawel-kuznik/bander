export function validateNumber(input: any) : number {

    // This might be a controversial decision, but it covers 95% of the cases.
    // When a number is not a number we throw an error that it's not a number.
    // This way we can make more intuitive handling of unexpected input.
    const parsed = Number(input);
    if (Number.isNaN(parsed)) throw Error('Not a number');

    return input;
};