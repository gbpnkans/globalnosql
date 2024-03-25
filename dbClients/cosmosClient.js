const { CosmosClient } = require("@azure/cosmos");
const loadConfig = require("../configLoader");

const getCosmosClient = async () => {
  try {
    const config = await loadConfig();
    const { azure } = config;

    if (!azure || !azure.endpoint || !azure.key) {
      console.error("Azure CosmosDB configuration is missing in config.json");
      throw new Error("Azure CosmosDB configuration is missing in config.json");
    }

    console.log("Creating CosmosDB client with provided configuration.");
    const client = new CosmosClient({
      endpoint: azure.endpoint, // INPUT_REQUIRED {Your CosmosDB endpoint}
      key: azure.key, // INPUT_REQUIRED {Your CosmosDB key}
    });

    return client;
  } catch (error) {
    console.error("Error configuring CosmosDB client. Please check if your Azure endpoint and key in config.json are correct.", error.stack);
    throw new Error("Failed to configure CosmosDB client due to incorrect or insufficient credentials.");
  }
};

module.exports = getCosmosClient;