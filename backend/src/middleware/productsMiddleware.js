import { containsInvalidKeys, isPayloadComplete, validatePayloadDataTypes, validateValueConstraints } from "./payloadValidator.js";

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
        if (!validatePayloadDataTypes(payloadKeys, schemaKeys)) {
            return res.status(400).json({ message: "Invalid data types of values in payload." });
        }

        // check for constraint violations
        if (!validateValueConstraints(req.body, payloadKeys, schema)) {
            return res.status(400).json({ message: "Data outside of boundaries." });
        }
    }
}