const express = require('express');
const router = express.Router();
const { createItem: createDynamoItem, readItem: readDynamoItem, updateItem: updateDynamoItem, deleteItem: deleteDynamoItem } = require('./dbClients/dynamoOperations');
const { createItem: createCosmosItem, readItem: readCosmosItem, updateItem: updateCosmosItem, deleteItem: deleteCosmosItem } = require('./dbClients/cosmosOperations');

router.use(express.json());

router.route('/:dbType/:containerName/:id')
  .post(async (req, res) => {
    try {
      const { dbType, containerName, id } = req.params;
      const data = req.body;
      console.log(`Received POST request for ${dbType} with containerName: ${containerName} and id: ${id}`);
      if (dbType === 'dyn') {
        await createDynamoItem(containerName, id, data);
      } else if (dbType === 'cos') {
        await createCosmosItem(containerName, id, data);
      } else {
        console.log('Invalid database type specified in POST request');
        return res.status(400).send('Invalid database type');
      }
      res.status(201).send('Item created');
    } catch (error) {
      console.error('Error performing POST operation:', error.stack);
      res.status(500).send('Internal Server Error');
    }
  })
  .get(async (req, res) => {
    try {
      const { dbType, containerName, id } = req.params;
      console.log(`Received GET request for ${dbType} with containerName: ${containerName} and id: ${id}`);
      let item;
      if (dbType === 'dyn') {
        item = await readDynamoItem(containerName, id);
      } else if (dbType === 'cos') {
        item = await readCosmosItem(containerName, id);
      } else {
        console.log('Invalid database type specified in GET request');
        return res.status(400).send('Invalid database type');
      }
      if (!item) {
        return res.status(404).send('Item not found');
      }
      res.status(200).json(item);
    } catch (error) {
      console.error('Error performing GET operation:', error.stack);
      res.status(500).send('Internal Server Error');
    }
  })
  .put(async (req, res) => {
    try {
      const { dbType, containerName, id } = req.params;
      const data = req.body;
      console.log(`Received PUT request for ${dbType} with containerName: ${containerName} and id: ${id}`);
      if (dbType === 'dyn') {
        await updateDynamoItem(containerName, id, data);
      } else if (dbType === 'cos') {
        await updateCosmosItem(containerName, id, data);
      } else {
        console.log('Invalid database type specified in PUT request');
        return res.status(400).send('Invalid database type');
      }
      res.status(200).send('Item updated');
    } catch (error) {
      console.error('Error performing PUT operation:', error.stack);
      res.status(500).send('Internal Server Error');
    }
  })
  .patch(async (req, res) => {
    try {
      const { dbType, containerName, id } = req.params;
      const data = req.body;
      console.log(`Received PATCH request for ${dbType} with containerName: ${containerName} and id: ${id}`);
      if (dbType === 'dyn') {
        await updateDynamoItem(containerName, id, data); // Using update for upsert in this simplified example
      } else if (dbType === 'cos') {
        await updateCosmosItem(containerName, id, data); // Using update for upsert in this simplified example
      } else {
        console.log('Invalid database type specified in PATCH request');
        return res.status(400).send('Invalid database type');
      }
      res.status(200).send('Item upserted');
    } catch (error) {
      console.error('Error performing PATCH operation:', error.stack);
      res.status(500).send('Internal Server Error');
    }
  })
  .delete(async (req, res) => {
    try {
      const { dbType, containerName, id } = req.params;
      console.log(`Received DELETE request for ${dbType} with containerName: ${containerName} and id: ${id}`);
      if (dbType === 'dyn') {
        await deleteDynamoItem(containerName, id);
      } else if (dbType === 'cos') {
        await deleteCosmosItem(containerName, id);
      } else {
        console.log('Invalid database type specified in DELETE request');
        return res.status(400).send('Invalid database type');
      }
      res.status(200).send('Item deleted');
    } catch (error) {
      console.error('Error performing DELETE operation:', error.stack);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;