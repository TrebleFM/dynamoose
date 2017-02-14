"use strict";

const debug = require("debug")("dynamoose");
const AWS = require("aws-sdk/global");
require("aws-sdk/clients/dynamodb");

const Model = require("./Model");
const Schema = require("./Schema");
const Table = require("./Table");
const VirtualType = require("./VirtualType");

class Dynamoose {
    constructor() {
        this.models = {};

        this.defaults = {
            create: true,
            update: false,
            waitForActive: true, // Wait for table to be created
            waitForActiveTimeout: 3 * 60 * 1000, // 3 minutes
            prefix: ""
        };
    }

    local(url) {
        this.endpointURL = url || "http://localhost:8000";
        debug("Setting DynamoDB to local (%s)", this.endpointURL);
    }

    ddb() {
        if (this.dynamoDB) {
            return this.dynamoDB;
        }

        if (this.endpointURL) {
            debug("Setting DynamoDB to %s", this.endpointURL);
            this.dynamoDB = new this.AWS.DynamoDB({
                endpoint: new this.AWS.Endpoint(this.endpointURL)
            });
        } else {
            debug("Getting default DynamoDB");
            this.dynamoDB = new this.AWS.DynamoDB();
        }

        return this.dynamoDB;
    }

    setDefaults(options) {
        Object.assign(this.defaults, options);
    }

    model(name, schema, options) {
        name = options.prefix + name;
        options = Object.assign({}, this.defaults, options);

        if (this.models[name]) {
            debug("Using existing model %s", name);
            return this.models[name];
        }

        if (!(schema instanceof Schema)) {
            debug("Building schema for model %s", name);
            schema = new Schema(schema, options);
        }

        debug("Compiling model %s", name);
        let model = Model.compile(name, schema, options, this);
        this.models[name] = model;
        return model;
    }

    AWS = AWS
    Dynamoose = Dynamoose
    Schema = Schema
    Table = Table
    VirtualType = VirtualType
}

module.exports = new Dynamoose();
