export const containsOperation = (payload) => {
    if (payload[operation] === undefined) {
        return false;
    }
    return true;
}

export const isValidUpdatePayload = (payload) => {
    if (payload[operation] === "update") {
        return true;
    }
    return false;
}

export const checkPaymentType = (payload) => {
    if (payload["payment_type"] === "GCash" && payload["payment_refstr"] === undefined) {
        return false;
    }
    return true;
}

export const containsRequiredInsertFields = (payload) => {
    
}