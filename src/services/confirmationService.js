import { v4 as uuidv4 } from 'uuid';

async function handleRequestBody(requestId, requestType, requestParams) {
    if (!requestType || !requestParams) {
        return Promise.reject("Invalid request body! Fill in a request ID, request type, or request parameters!")
    }
    
    switch (requestType) {
        case "getConfirmation":
            console.log("get confirmation");
            await getConfirmation(requestId, requestType, requestParams);
            break;
        
        case "getAllConfirmations":
            console.log("get all confirmations");
            await getAllConfirmations(requestId, requestType, requestParams);
            break;
        
        case "deleteConfirmation":
            console.log("deleted confirmation");
            await deleteConfirmation(requestId, requestType, requestParams);
            break;
        
        default:
            console.log("invalid request body!")
            break;
    }
}

async function getConfirmation(requestId, requestType, requestParams) {
    // TODO: create method body
}

async function getAllConfirmations(requestId, requestType, requestParams) {
    // TODO: create method body
}

async function deleteConfirmation(requestId, requestType, requestParams) {
    // TODO: create method body 
}