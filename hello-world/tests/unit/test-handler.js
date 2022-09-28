'use strict';

const app = require('../../app.js');
const axios = require('axios');
const chai = require('chai');
const expect = chai.expect;
var event, context;

describe('Tests index', function () {
    it("verifies successful response from through API", async () => {
        let data = {
            "name": "John Broklyn",
            "phoneNumber": "0761234567",
            "serviceType": "Movie",
            "consent": "NO",
            "consentTimeStamp": "22/11/2020 12:53:29 PM",
            "origin": "DEV",
            "additionalProps": {
                "city": "New York",
                "country": "USA"
            }
        }
        const url = "http://localhost:3000/leads";

        let response = await axios.post(url, data=JSON.stringify(data));

        console.log(response.data);

        expect(response.status).to.be.equal(200);
    });
});
