
import { SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';
import { ToDoItem, ProductInfo } from '../models';

// enablePromise(true);

const tableName = 'TodoData';

export const getDBConnection = async () => {
    const dbName = 'todo-data.db';
    const dbLocation = 'default';
 

    function successCB() {
        console.log("SQL executed fine");
    }
    try {
        const db = await openDatabase({ name: dbName, location: dbLocation }, successCB,);
        console.log('Database Name:', db);
        console.log('Database Location:', dbLocation);
        return db;
    } catch (error) {
        console.error('Error opening database:', error);
        throw error;
    }
};

export const createTable = async () => {
    console.log("in if");
    const dbName = 'todo-data.db';
    const dbLocation = 'default';

 
    function successCB() {
        console.log("SQL executed fine");
    }
    
    const db = await openDatabase({ name: dbName, location: dbLocation }, successCB, );

    const cartQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id TEXT NOT NULL,
        product_name TEXT,
        product_img TEXT,
        product_price TEXT,
        product_qty INTEGER NOT NULL,
        customer_id INTEGER NOT NULL
    );`;
    console.log("in if 2");
    try {
        await db.executeSql(cartQuery);
        console.log("Table created successfully!");
    } catch (error) {
        console.error("Error creating table:", error);
        throw new Error('Failed to create Table');
    }
};

export const addProduct = async (db: SQLiteDatabase, ProductInfo: ProductInfo) => {

    console.log("In ADDProduct");
    const insertQuery = `INSERT INTO ${tableName} (
        product_id,
        product_name,
        product_img,
        product_price,
        product_qty,
        customer_id
    ) VALUES (
        ${ ProductInfo.product_id},
        ${ProductInfo.product_name},
        ${ProductInfo.product_img},
        ${ProductInfo.product_price},
        ${ProductInfo.product_qty},
        ${ProductInfo.customer_id}
    );`;

   
    console.log("addProduct2");
    try {
        await db.executeSql(insertQuery);
        console.log("Data Added");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to Add Product");
    }
};

export const getProduct = async (db: SQLiteDatabase): Promise<ProductInfo[]> => {
    console.log("IN the getProducts ")
    try {
        const products: ProductInfo[] = [];
        const results = await db.executeSql(`SELECT * FROM ${tableName}`);
        if (results && results[0] && results[0].rows) {
            for (let index = 0; index < results[0].rows.length; index++) {
                products.push(results[0].rows.item(index));
            }
        } else {
            console.log("No results found.");
        }

        console.log(products);
        return products;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get products');
    }
};


// Function to check if the table exists
export const checkTableExistence = async (db: SQLiteDatabase, tableName: string): Promise<boolean> => {
    const query = `SELECT name FROM sqlite_master WHERE type='table'`;
    const result = await db.executeSql(query);
    console.log("checkTable result", result);
    return result && result[0] && result[0].rows && result[0].rows.length > 0;
};

// Function to populate sample data into the table
export const populateSampleData = async (db: SQLiteDatabase) => {
    const sampleData = [
        { product_id: '1', product_name: 'Product 1', product_img: 'image1.jpg', product_price: '10.00', product_qty: 5, customer_id: 1 },
        { product_id: '2', product_name: 'Product 2', product_img: 'image2.jpg', product_price: '20.00', product_qty: 10, customer_id: 1 }
    ];

    for (const data of sampleData) {
        await addProduct(db, data);

    } console.log("data initialised");
};



// Call the main function to check table existence and retrieve data
// Main function to check table existence and retrieve data
export const checkTableAndGetData = async () => {
    console.log("running CHECK");
    const db = await getDBConnection(); // Assuming you have a function to get the database connection
    if (!db) {
        console.error('Failed to connect to the database');
        return;
    }

    const tableExists = await checkTableExistence(db, tableName);
    if (!tableExists) {
        console.log(`Table TodoData does not exist.`);
        return;
    }

    // If the table exists, populate sample data and retrieve it
    await populateSampleData(db);
    const products = await getProduct(db);
    console.log('Products:', products);
};
export const deleteTodoItem = async (db: SQLiteDatabase, id: number) => {
    const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
    console.log(deleteQuery);
    await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
    const query = `drop table ${tableName}`;

    await db.executeSql(query);
};