import { containsInvalidKeys, isPayloadComplete, validatePayloadDataTypes, validateValueConstraints} from "./payloadValidator.js";

export const validateInsertPayload = (schema) => {
    return (req, res, next) => {
        // should be complete set of fields
        const payloadKeys = Object.keys(req.body);
        const schemaKeys = Object.keys(schema);

        // STAGE 0: Check for invalid fields
        if (!containsInvalidKeys(payloadKeys, schemaKeys)) {
            return res.status(400).json({ message: `Invalid fields detected.` })
        }

        // STAGE 1: check for complete fields
        if (!isPayloadComplete(payloadKeys, schemaKeys)) {
            return res.status(400).json({ message: `Missing required fields.`});
        }

        // STAGE 2: check for valid data types
        if (!validatePayloadDataTypes(req.body, payloadKeys, schema)) {
            return res.status(400).json({ message: "Invalid data types for values."});
        }

        // STAGE 3: Check if values do not violate constraints
        if (!validateValueConstraints(req.body, payloadKeys, schema)) {
            return res.status(400).json({ message: "Data outside boundaries."});
        }

        next();
    }
}

export const validatePatchPayload = (schema) => {
    return (req, res, next) => {
        // in patch, keys don't have to be complete; as long as they contain the valid keys everything is good
        const payloadKeys = Object.keys(req.body);
        const schemaKeys = Object.keys(schema);

        // check for invalid keys
        if (!containsInvalidKeys(payloadKeys, schemaKeys)) {
            return res.status(400).json({ message: `Invalid fields detected.` })
        }

        // check for keys with invalid data types
        // TODO: Isolate in separate file for reusability
        for (const key in schema) {
            if (typeof req.body[key] !== schema[key]) {
                return res.status(400).json({ message: `Invalid data types provided for field: ${key}.` });
            }
        }

        // check for constraint violations
        // TODO: Isolate in separate file for reusability
        for (const key in payloadKeys) {
            if (typeof req.body[key] == 'number') {
                if (req.body[key] > Number.MAX_SAFE_INTEGER) {
                    return res.status(400).json({ message: `Error: integer overflow detected for ${key}: ${req.body[key]}` });
                }
            }
            else if (typeof req.body[key] == 'string') {
                if (req.body[key].length > MAX_STRING_LENGTH) {
                    return res.status(400).json({ message: `Error: string length constraint violated by ${key}: ${req.body[key]}` });
                }
            }
        }
    }
}