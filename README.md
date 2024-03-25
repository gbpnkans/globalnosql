# GlobalNoSQL

GlobalNoSQL is an innovative online NoSQL Database Management Service designed to simplify the way developers interact with NoSQL databases. By providing a unified REST API, GlobalNoSQL supports basic CRUD and Upsert operations across Amazon DynamoDB and Azure CosmosDB, with plans to expand to more NoSQL stores. This service is perfect for developers seeking to manage NoSQL databases without the hassle of dealing with multiple APIs.

## Overview

Built using Node.js and Express, GlobalNoSQL offers a scalable and efficient backend architecture. It features integration with AWS SDK v3 for DynamoDB and Azure CosmosDB SDK for enhanced database operations. The project is structured to include essential components like authentication middleware, configuration loaders, and database clients, ensuring a modular and maintainable codebase.

## Features

- Unified REST API for NoSQL Operations
- Initial support for Amazon DynamoDB and Azure CosmosDB
- Basic HTTP Authentication for secure API access
- Configuration Management via a `config.json` file
- Designed for future extendibility to support additional NoSQL stores

## Getting started

### Requirements

- Node.js
- npm (Node Package Manager)
- Access to Amazon DynamoDB and/or Azure CosmosDB

### Quickstart

1. Clone the repository to your local machine.
2. Navigate to the project directory and run `npm install` to install dependencies.
3. Configure `config.json` with your database and authentication details.
4. Start the application by running `node index.js`.
5. The service will be available at `http://localhost:3000` (default port).

### License

Copyright (c) 2024.