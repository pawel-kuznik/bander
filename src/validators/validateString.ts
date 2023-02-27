/**
 *  A function to validate a string. If the input is not a string, then it
 *  throw an error.
 */
export function validateString(input: string) : string {

    if (typeof(input) != 'string') throw Error('Not a string');
    return input;
};