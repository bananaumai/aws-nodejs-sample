var AWS = require("aws-sdk");

AWS.config.update({
  region: process.env.AWS_REGION
});
  
var docClient = new AWS.DynamoDB.DocumentClient();
  
var table = process.env.DYNAMO_TABLE;
  
console.log("Querying for movies from 1992 - titles A-L, with genres and lead actor");

var params = {
    TableName : table,
    ProjectionExpression:"#pkey, message_received_at, payload.rand",
    KeyConditionExpression: "#pkey = :id and message_received_at between :from and :to",
    ExpressionAttributeNames:{
        "#pkey": "slack_user_id"
    },
    ExpressionAttributeValues: {
        ":id": 'abc1234',
        ":from": 1512899447224,
        ":to": 1612899447224
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(item)
        });
    }
});