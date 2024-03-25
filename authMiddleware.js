const auth = require('basic-auth');
const fs = require('fs').promises;
const path = require('path');

const configPath = path.join(__dirname, 'config.json');

const authenticate = async (req, res, next) => {
  const credentials = auth(req);

  try {
    const config = JSON.parse(await fs.readFile(configPath, 'utf8'));

    if (!credentials || credentials.name !== config.auth.username || credentials.pass !== config.auth.password) {
      console.log('Authentication failed: Invalid credentials');
      res.status(401);
      res.setHeader('WWW-Authenticate', 'Basic realm="GlobalNoSQL"');
      res.end('Unauthorized');
    } else {
      console.log('Authentication successful');
      next();
    }
  } catch (error) {
    console.error('Authentication error:', error.stack);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = authenticate;