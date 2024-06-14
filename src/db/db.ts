import pgPromise from "pg-promise";

const pgp = pgPromise();

const dbURL = process.env.DATABASE_URL

const db = pgp(`${dbURL}/flydb`)

export const getUsers = async () => {
  return await db.any('SELECT * FROM accounts');
} 

export const getTable = async (table_name:string ) => {
  return await db.any(`SELECT * FROM ${table_name}`);
}

export const insert = async (table_name: string, values: JSON) => {
  
}