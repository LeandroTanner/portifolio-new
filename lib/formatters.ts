export const isValidString = (str?: string | null) => {
    return !!str && str.trim().length > 0 && str !== 'undefined' && str !== 'null';
}