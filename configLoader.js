const fs = require('fs').promises;
const path = require('path');

const loadConfig = async () => {
  const configPath = path.join(__dirname, 'config.json');
  try {
    const configData = await fs.readFile(configPath, 'utf8');
    const config = JSON.parse(configData);
    validateConfig(config); // Call to validateConfig function to ensure all necessary configurations are present
    console.log('Configuration successfully loaded');
    return config;
  } catch (error) {
    console.error('Failed to load configuration:', error.stack);
    process.exit(1); // Exit the process if configuration cannot be loaded
  }
};

// Function to validate the presence of necessary configurations for DynamoDB and CosmosDB
function validateConfig(config) {
  const requiredAwsConfig = ['accessKeyId', 'secretAccessKey', 'region'];
  const requiredAzureConfig = ['endpoint', 'key'];

  let missingConfig = requiredAwsConfig.filter(key => !config.aws || !config.aws[key]);
  if (missingConfig.length > 0) {
    console.error(`Missing AWS configuration: ${missingConfig.join(', ')}`);
    process.exit(1);
  }

  missingConfig = requiredAzureConfig.filter(key => !config.azure || !config.azure[key]);
  if (missingConfig.length > 0) {
    console.error(`Missing Azure CosmosDB configuration: ${missingConfig.join(', ')}`);
    process.exit(1);
  }
}

module.exports = loadConfig;