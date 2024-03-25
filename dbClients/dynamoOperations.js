const { DynamoDBClient, PutItemCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");
const getDynamoDBClient = require("./dynamoClient");

async function createItem(tableName, id, data) {
  const client = await getDynamoDBClient();
  const params = {
    TableName: tableName,
    Item: {
      id: { S: id },
      ...data,
    },
  };
  try {
    await client.send(new PutItemCommand(params));
    console.log("Item created successfully in DynamoDB");
  } catch (error) {
    console.error("Error creating item in DynamoDB:", error.stack);
    throw error;
  }
}

async function readItem(tableName, id) {
  const client = await getDynamoDBClient();
  const params = {
    TableName: tableName,
    Key: {
      id: { S: id },
    },
  };
  try {
    const { Item } = await client.send(new GetItemCommand(params));
    console.log("Item read successfully from DynamoDB");
    return Item;
  } catch (error) {
    console.error("Error reading item from DynamoDB:", error.stack);
    throw error;
  }
}

async function updateItem(tableName, id, data) {
  const client = await getDynamoDBClient();
  const updateExpression = "set " + Object.keys(data).map(key => `${key} = :${key}`).join(", ");
  const expressionAttributeValues = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [`:${key}`, { S: value }])
  );
  const params = {
    TableName: tableName,
    Key: { id: { S: id } },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
  };
  try {
    await client.send(new UpdateItemCommand(params));
    console.log("Item updated successfully in DynamoDB");
  } catch (error) {
    console.error("Error updating item in DynamoDB:", error.stack);
    throw error;
  }
}

async function deleteItem(tableName, id) {
  const client = await getDynamoDBClient();
  const params = {
    TableName: tableName,
    Key: {
      id: { S: id },
    },
  };
  try {
    await client.send(new DeleteItemCommand(params));
    console.log("Item deleted successfully from DynamoDB");
  } catch (error) {
    console.error("Error deleting item from DynamoDB:", error.stack);
    throw error;
  }
}

module.exports = { createItem, readItem, updateItem, deleteItem };