'use strict';

const app = require('../../app.js');
const axios = require('axios');
const chai = require('chai');
const expect = chai.expect;
var event, context;

describe('Tests index', function () {
    it('verifies successful response', async () => {
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
        expect(response.message).to.be.equal("hello world");
        // expect(response.location).to.be.an("string");
    });
    it("verifies successful response from through API", async () => {
        const url = "http://localhost:3000/hello";

        let response = await axios.get(url);

        expect(response.status).to.be.equal(200);
        expect(response.data.message).to.be.equal("hello world");
    });
});
