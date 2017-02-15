"use strict";

const ExtendableError = require("extendable-error-class");

class SchemaError extends ExtendableError {
    constructor(message) {
        super(message || "Error with schema");
    }
}

class ModelError extends ExtendableError {
    constructor(message) {
        super(message || "Error with schema");
    }
}

class QueryError extends ExtendableError {
    constructor(message) {
        super(message || "Error with schema");
    }
}

class ScanError extends ExtendableError {
    constructor(message) {
        super(message || "Error with schema");
    }
}

class ValidationError extends ExtendableError {
    constructor(message) {
        super(message || "Error with schema");
    }
}

module.exports = {
    SchemaError,
    ModelError,
    QueryError,
    ScanError,
    ValidationError
};
