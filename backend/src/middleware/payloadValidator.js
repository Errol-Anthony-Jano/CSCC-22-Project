const MAX_STRING_LENGTH = 255;
const MAX_SIGNEDINT_VALUE = 2147483647;

export const containsInvalidKeys = (payloadKeys, schemaKeys) => {
    const invalidKeys = payloadKeys.filter(key => !schemaKeys.includes(key));
    if (invalidKeys.length > 0) {
        return false;
    }
    return true;
}

export const isPayloadComplete = (payloadKeys, schemaKeys) => {
    // used for POST requests where all fields are necessary
    return schemaKeys.every(key => payloadKeys.includes(key));
}

export const validatePayloadDataTypes = (payload, payloadKeys, schema) => {
    for (const key of payloadKeys) {
        if (typeof payload[key] !== schema[key]) {
            return false;
        }
    }
    return true;
}

export const validateValueConstraints = (payload, payloadKeys, schema) => {
    for (const key of payloadKeys) {
        if (typeof payload[key] === 'string' && (payload[key].length > MAX_STRING_LENGTH || payload[key].length == 0)) {
            return false;
        }
        else if (typeof payload[key] === 'number' && (payload[key] > MAX_SIGNEDINT_VALUE || payload[key] < 0)) {
            return false;
        }
        else if (key === 'product_unit_price' && payload[key] === 0) {
            return false;
        }
    }
    return true;
}