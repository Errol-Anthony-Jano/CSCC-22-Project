import { containsInvalidKeys } from "./payloadValidator";
import { checkPaymentType, containsOperation } from "./transactionValidator"

export const validateTransaction = (payload, schema) => {
    return (req, res, next) => {
        const payloadKeys = Object.keys(payload);
        const schemaKeys = Object.keys(schema);

        if (!containsOperation(payload)) {
            return res.status(400).json({ message: "operation key not found in payload." });
        }

        if (!containsInvalidKeys(payloadKeys, schemaKeys)) {
            return res.status(400).json({ message: "Invalid fields detected." });
        }

        if (!checkPaymentType(req.body)) {
            return res.status(400).json({ message: "Please make sure to provide the reference string for GCash payments."});
        }
    }
}