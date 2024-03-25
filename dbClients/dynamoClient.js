const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const loadConfig = require("../configLoader");

const getDynamoDBClient = async () => {
  console.log("Loading DynamoDB client configuration...");
  const config = await loadConfig();
  const { aws } = config;

  if (!aws || !aws.region || !aws.accessKeyId || !aws.secretAccessKey) {
    const error = new Error("AWS configuration is missing in config.json");
    console.error("Error loading DynamoDB client configuration:", error.stack);
    throw error;
  }

  try {
    const client = new DynamoDBClient({
      region: aws.region,
      credentials: {
        accessKeyId: aws.accessKeyId,
        secretAccessKey: aws.secretAccessKey,
      },
    });
    console.log("DynamoDB client successfully configured.");
    return client;
  } catch (error) {
    console.error("Error configuring DynamoDB client. Please check if your AWS credentials and region in config.json are correct.", error.stack);
    throw new Error("Failed to configure DynamoDB client due to incorrect or insufficient credentials.");
  }
};

module.exports = getDynamoDBClient;