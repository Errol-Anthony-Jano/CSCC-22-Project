export const validatePayload = (schema) => {
    return (req, res, next) => {
        const payloadKeys = Object.keys(req.body);
        const validKeys = Object.keys(schema);

        const invalidKeys = payloadKeys.filter(key => !validKeys.includes(key));
    
        // check for extra keys in the payload that are not defined in the schema
        if (invalidKeys.length > 0) {
            return res.status(400).json({ message: `Invalid fields: ${invalidKeys.join(', ')}.` });
        }

        if (req.method == "POST") {
            // check for missing fields in the payload
            for (const key in schema) {
                if (!payloadKeys.includes(key)) {
                    return res.status(400).json({ message: `Missing required field ${key}.`});
                }
            }
        }

        if (req.method == "PATCH") {
            if (payloadKeys.length === 0) {
                return res.status(400).json({ message: "At least one valid field is required for update." });
            }
        }

        // check if payload value data types match the schema
        for (const key in schema) {
            if (typeof req.body[key] !== schema[key]) {
                return res.status(400).json({ message: `Invalid data types provided for field: ${key}.` });
            } 
        }
    };
};