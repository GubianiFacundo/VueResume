const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const defaultDatabase = 'postgres';
const targetDatabase = process.env.DB_NAME || 'vue_resume';

const createDatabaseIfNotExists = async (client) => {
  const query = `SELECT 1 FROM pg_database WHERE datname = '${targetDatabase}'`;
  const result = await client.query(query);

  if (result.rowCount === 0) {
    console.log(`Database "${targetDatabase}" does not exist. Creating it...`);
    await client.query(`CREATE DATABASE ${targetDatabase}`);
    console.log(`Database "${targetDatabase}" created successfully.`);
  } else {
    console.log(`Database "${targetDatabase}" already exists.`);
  }
};

const runMigrations = async () => {
  // Step 1: Connect to the default database
  const defaultClient = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: defaultDatabase,
  });

  try {
    await defaultClient.connect();
    console.log(`Connected to the default database "${defaultDatabase}".`);

    // Step 2: Create the target database if it doesn't exist
    await createDatabaseIfNotExists(defaultClient);
  } catch (error) {
    console.error('Error creating the database:', error);
    await defaultClient.end();
    return;
  } finally {
    await defaultClient.end();
  }

  // Step 3: Connect to the target database
  const targetClient = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: targetDatabase,
  });

  try {
    await targetClient.connect();
    console.log(`Connected to the target database "${targetDatabase}".`);

    // Step 4: Run migrations
    const migrationsDir = path.join(__dirname, '../migrations');
    const files = fs.readdirSync(migrationsDir).sort();

    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');
      console.log(`Running migration: ${file}`);
      await targetClient.query(sql);
    }

    console.log('All migrations ran successfully.');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    await targetClient.end();
  }
};

runMigrations();