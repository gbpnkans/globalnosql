const getCosmosClient = require("./cosmosClient");

async function createItem(containerName, id, data) {
  try {
    const client = await getCosmosClient();
    const { database } = await client.databases.createIfNotExists({ id: "AppDatabase" });
    const { container } = await database.containers.createIfNotExists({ id: containerName });
    await container.items.create({ id, ...data });
    console.log(`Item with id ${id} created in CosmosDB container ${containerName}`);
  } catch (error) {
    console.error("Failed to create item in CosmosDB:", error.stack);
    throw error;
  }
}

async function readItem(containerName, id) {
  try {
    const client = await getCosmosClient();
    const { container } = client.database("AppDatabase").container(containerName);
    const { resource } = await container.item(id, id).read();
    console.log(`Item with id ${id} retrieved from CosmosDB container ${containerName}`);
    return resource;
  } catch (error) {
    console.error("Failed to read item from CosmosDB:", error.stack);
    throw error;
  }
}

async function updateItem(containerName, id, data) {
  try {
    const client = await getCosmosClient();
    const { container } = client.database("AppDatabase").container(containerName);
    await container.items.upsert({ id, ...data });
    console.log(`Item with id ${id} updated in CosmosDB container ${containerName}`);
  } catch (error) {
    console.error("Failed to update item in CosmosDB:", error.stack);
    throw error;
  }
}

async function deleteItem(containerName, id) {
  try {
    const client = await getCosmosClient();
    const { container } = client.database("AppDatabase").container(containerName);
    await container.item(id, id).delete();
    console.log(`Item with id ${id} deleted from CosmosDB container ${containerName}`);
  } catch (error) {
    console.error("Failed to delete item from CosmosDB:", error.stack);
    throw error;
  }
}

module.exports = { createItem, readItem, updateItem, deleteItem };