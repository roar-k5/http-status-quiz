const QUESTIONS = [
    {
        id: 1,
        scenario: "A client tries to access a protected resource but hasn't provided any authentication credentials.",
        correct: { code: "401", name: "Unauthorized" },
        options: [
            { code: "401", name: "Unauthorized" },
            { code: "403", name: "Forbidden" },
            { code: "404", name: "Not Found" },
            { code: "500", name: "Internal Server Error" }
        ],
        explanation: "401 means authentication is required and has failed or not been provided. 403 means authentication succeeded but access is forbidden.",
        category: "client-error",
        difficulty: "medium"
    },
    {
        id: 2,
        scenario: "The server understood the request, but refuses to authorize it. The client is authenticated but doesn't have permission.",
        correct: { code: "403", name: "Forbidden" },
        options: [
            { code: "401", name: "Unauthorized" },
            { code: "403", name: "Forbidden" },
            { code: "404", name: "Not Found" },
            { code: "405", name: "Method Not Allowed" }
        ],
        explanation: "403 Forbidden: Server understood the request but refuses to authorize it. Unlike 401, authenticating won't make a difference.",
        category: "client-error",
        difficulty: "medium"
    },
    {
        id: 3,
        scenario: "The server is currently unable to handle the request due to temporary overload or scheduled maintenance.",
        correct: { code: "503", name: "Service Unavailable" },
        options: [
            { code: "500", name: "Internal Server Error" },
            { code: "502", name: "Bad Gateway" },
            { code: "503", name: "Service Unavailable" },
            { code: "504", name: "Gateway Timeout" }
        ],
        explanation: "503 Service Unavailable: Server is temporarily unable to handle the request, usually due to overload or maintenance.",
        category: "server-error",
        difficulty: "easy"
    },
    {
        id: 4,
        scenario: "The server encountered an unexpected condition that prevented it from fulfilling the request.",
        correct: { code: "500", name: "Internal Server Error" },
        options: [
            { code: "400", name: "Bad Request" },
            { code: "500", name: "Internal Server Error" },
            { code: "502", name: "Bad Gateway" },
            { code: "503", name: "Service Unavailable" }
        ],
        explanation: "500 Internal Server Error: Generic error message when server encounters an unexpected condition.",
        category: "server-error",
        difficulty: "easy"
    },
    {
        id: 5,
        scenario: "The request could not be understood by the server due to malformed syntax.",
        correct: { code: "400", name: "Bad Request" },
        options: [
            { code: "400", name: "Bad Request" },
            { code: "401", name: "Unauthorized" },
            { code: "404", name: "Not Found" },
            { code: "422", name: "Unprocessable Entity" }
        ],
        explanation: "400 Bad Request: Server cannot process the request due to client error (malformed syntax, invalid framing, etc.).",
        category: "client-error",
        difficulty: "easy"
    },
    {
        id: 6,
        scenario: "The requested resource could not be found but may be available in the future.",
        correct: { code: "404", name: "Not Found" },
        options: [
            { code: "400", name: "Bad Request" },
            { code: "403", name: "Forbidden" },
            { code: "404", name: "Not Found" },
            { code: "410", name: "Gone" }
        ],
        explanation: "404 Not Found: Server can't find the requested resource. One of the most famous status codes on the web.",
        category: "client-error",
        difficulty: "easy"
    },
    {
        id: 7,
        scenario: "The request has succeeded. The meaning of success depends on the HTTP method used.",
        correct: { code: "200", name: "OK" },
        options: [
            { code: "200", name: "OK" },
            { code: "201", name: "Created" },
            { code: "204", name: "No Content" },
            { code: "202", name: "Accepted" }
        ],
        explanation: "200 OK: The request has succeeded. The payload sent depends on the HTTP method.",
        category: "success",
        difficulty: "easy"
    },
    {
        id: 8,
        scenario: "The request has been fulfilled and resulted in a new resource being created.",
        correct: { code: "201", name: "Created" },
        options: [
            { code: "200", name: "OK" },
            { code: "201", name: "Created" },
            { code: "202", name: "Accepted" },
            { code: "204", name: "No Content" }
        ],
        explanation: "201 Created: Request succeeded and a new resource was created. Usually sent in response to POST requests.",
        category: "success",
        difficulty: "easy"
    },
    {
        id: 9,
        scenario: "The server successfully processed the request and is not returning any content.",
        correct: { code: "204", name: "No Content" },
        options: [
            { code: "200", name: "OK" },
            { code: "202", name: "Accepted" },
            { code: "204", name: "No Content" },
            { code: "404", name: "Not Found" }
        ],
        explanation: "204 No Content: Server successfully processed the request and isn't returning any content.",
        category: "success",
        difficulty: "medium"
    },
    {
        id: 10,
        scenario: "The request has been accepted for processing, but the processing has not been completed.",
        correct: { code: "202", name: "Accepted" },
        options: [
            { code: "200", name: "OK" },
            { code: "201", name: "Created" },
            { code: "202", name: "Accepted" },
            { code: "204", name: "No Content" }
        ],
        explanation: "202 Accepted: Request accepted for processing but not completed. Used for asynchronous processing.",
        category: "success",
        difficulty: "hard"
    },
    {
        id: 11,
        scenario: "The server is a gateway or proxy and received an invalid response from the upstream server.",
        correct: { code: "502", name: "Bad Gateway" },
        options: [
            { code: "500", name: "Internal Server Error" },
            { code: "502", name: "Bad Gateway" },
            { code: "503", name: "Service Unavailable" },
            { code: "504", name: "Gateway Timeout" }
        ],
        explanation: "502 Bad Gateway: Server acting as gateway received an invalid response from upstream server.",
        category: "server-error",
        difficulty: "medium"
    },
    {
        id: 12,
        scenario: "The server is a gateway and did not receive a timely response from the upstream server.",
        correct: { code: "504", name: "Gateway Timeout" },
        options: [
            { code: "500", name: "Internal Server Error" },
            { code: "502", name: "Bad Gateway" },
            { code: "503", name: "Service Unavailable" },
            { code: "504", name: "Gateway Timeout" }
        ],
        explanation: "504 Gateway Timeout: Server didn't receive a timely response from upstream server.",
        category: "server-error",
        difficulty: "medium"
    },
    {
        id: 13,
        scenario: "The method specified in the request is not allowed for the resource identified by the request URI.",
        correct: { code: "405", name: "Method Not Allowed" },
        options: [
            { code: "400", name: "Bad Request" },
            { code: "403", name: "Forbidden" },
            { code: "404", name: "Not Found" },
            { code: "405", name: "Method Not Allowed" }
        ],
        explanation: "405 Method Not Allowed: Request method (GET, POST, PUT, DELETE, etc.) not allowed for this resource.",
        category: "client-error",
        difficulty: "medium"
    },
    {
        id: 14,
        scenario: "The resource is only capable of generating response entities with content characteristics not acceptable according to the Accept headers.",
        correct: { code: "406", name: "Not Acceptable" },
        options: [
            { code: "400", name: "Bad Request" },
            { code: "404", name: "Not Found" },
            { code: "405", name: "Method Not Allowed" },
            { code: "406", name: "Not Acceptable" }
        ],
        explanation: "406 Not Acceptable: Server can't produce a response matching the list of acceptable values in request headers.",
        category: "client-error",
        difficulty: "hard"
    },
    {
        id: 15,
        scenario: "The client must first authenticate itself with the proxy.",
        correct: { code: "407", name: "Proxy Authentication Required" },
        options: [
            { code: "401", name: "Unauthorized" },
            { code: "403", name: "Forbidden" },
            { code: "407", name: "Proxy Authentication Required" },
            { code: "408", name: "Request Timeout" }
        ],
        explanation: "407 Proxy Authentication Required: Client must first authenticate itself with the proxy.",
        category: "client-error",
        difficulty: "hard"
    },
    {
        id: 16,
        scenario: "The server timed out waiting for the request.",
        correct: { code: "408", name: "Request Timeout" },
        options: [
            { code: "404", name: "Not Found" },
            { code: "408", name: "Request Timeout" },
            { code: "504", name: "Gateway Timeout" },
            { code: "503", name: "Service Unavailable" }
        ],
        explanation: "408 Request Timeout: Server timed out waiting for the request from the client.",
        category: "client-error",
        difficulty: "medium"
    },
    {
        id: 17,
        scenario: "The request could not be completed due to a conflict with the current state of the resource.",
        correct: { code: "409", name: "Conflict" },
        options: [
            { code: "400", name: "Bad Request" },
            { code: "403", name: "Forbidden" },
            { code: "404", name: "Not Found" },
            { code: "409", name: "Conflict" }
        ],
        explanation: "409 Conflict: Request couldn't be completed due to a conflict with the current state of the target resource.",
        category: "client-error",
        difficulty: "medium"
    },
    {
        id: 18,
        scenario: "The requested resource is no longer available and no forwarding address is known. This condition is expected to be permanent.",
        correct: { code: "410", name: "Gone" },
        options: [
            { code: "404", name: "Not Found" },
            { code: "410", name: "Gone" },
            { code: "500", name: "Internal Server Error" },
            { code: "503", name: "Service Unavailable" }
        ],
        explanation: "410 Gone: Resource is permanently gone and will not be available again. Stronger than 404.",
        category: "client-error",
        difficulty: "medium"
    },
    {
        id: 19,
        scenario: "The server refuses to accept the request without a defined Content-Length.",
        correct: { code: "411", name: "Length Required" },
        options: [
            { code: "400", name: "Bad Request" },
            { code: "411", name: "Length Required" },
            { code: "413", name: "Payload Too Large" },
            { code: "415", name: "Unsupported Media Type" }
        ],
        explanation: "411 Length Required: Server requires a Content-Length header in the request.",
        category: "client-error",
        difficulty: "hard"
    },
    {
        id: 20,
        scenario: "The server is refusing to process a request because the request payload is larger than the server is willing or able to process.",
        correct: { code: "413", name: "Payload Too Large" },
        options: [
            { code: "400", name: "Bad Request" },
            { code: "411", name: "Length Required" },
            { code: "413", name: "Payload Too Large" },
            { code: "414", name: "URI Too Long" }
        ],
        explanation: "413 Payload Too Large: Request entity is larger than limits defined by server.",
        category: "client-error",
        difficulty: "medium"
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QUESTIONS };
}