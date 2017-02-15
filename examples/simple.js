"use strict";

const dynamoose = require("../");

/*
 * Assumes AWS setting are in environment variables
 *
 * export AWS_ACCESS_KEY_ID="Your AWS Access Key ID"
 * export AWS_SECRET_ACCESS_KEY="Your AWS Secret Access Key"
 * export AWS_REGION="us-east-1"
 *
 * If not, they can be configured via the AWS object.
 *
 * dynamoose.AWS.config.update({
 *     accessKeyId: 'AKID',
 *     secretAccessKey: 'SECRET',
 *     region: 'us-east-1'
 * });
 *
 */

// dynamoose.local(); // Use a local DynamoDB

// Create cat model with default options
const Cat = dynamoose.model("Cat", {
    id: Number,
    name: String
});

// Create a new cat object
let garfield = new Cat({
    id: 1,
    name: "Garfield"
});

// Save to DynamoDB
garfield.save();

// Lookup in DynamoDB
Cat.get(1)
    .then((badCat) => {
        console.log(`Never trust a smiling cat. - ${badCat.name}`);
    });
