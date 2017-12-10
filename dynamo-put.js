var AWS = require("aws-sdk");

AWS.config.update({
  region: process.env.AWS_REGION
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = process.env.DYNAMO_TABLE;

var params = {
    TableName: table,
    Item:{
        "slack_user_id": "abc1234",
        "message_received_at": Date.now(),
        "payload":{
            "rand": Math.random()
        }
    }
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});