const AWS = require('aws-sdk'); 
const crypto = require('crypto');

const docClient = process.env.AWS_SAM_LOCAL ? new AWS.DynamoDB.DocumentClient({
  endpoint: "http://host.docker.internal:8000"
}) : new dynamodb.DocumentClient()



/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    const payload = JSON.parse(event.body);

    const leadId = crypto.randomUUID();

    const data = {
        "leadName": payload.name,
        "phoneNumber": payload.phoneNumber,
        "serviceType": payload.serviceType,
        "consent": payload.consent,
        "consentTimeStamp": payload.consentTimeStamp,
        "origin": payload.origin,
        "additionalProps": payload.additionalProps
    }


    const params = {
        TableName: process.env.PAYCARD_CHATBOT_LEADS_TABLE,
        Item: {
            ...data,
            leadId,
            created: new Date().toISOString()
        }
    };

    let responseBody = null;

    try {
        console.log("creating lead, ", documentClient);
        console.log(params, 'the params');
        const data = await documentClient.put(params).promise();
        responseBody = {
            statusCode: 200,
            body: JSON.stringify({
                leadId,
                message: "Chatbot lead has been created successfully"
            })
        };
    } catch (err) {
        console.log("Error Creating, Error Response", err);
        responseBody = {
            statusCode: 500,
            body: JSON.stringify(err)
        };
    }

    console.log("*** API Response ***", responseBody);

    return responseBody;
};
