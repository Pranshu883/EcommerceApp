
import { SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';
import { ProductInfo, ToDoItem, } from '../models';


enablePromise(true);

const tableName = 'Cart';
const tableName2 = 'WishList';

export const getDBConnection = async () => {
    console.log("In Connection function ");
    const db = openDatabase({ name: 'Ecommerce.db', location: 'default' })
    console.log("db => ", db)
    return db;
};

export const createTable = async (db: SQLiteDatabase) => {
    // console.log("In create Function ");
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id TEXT NOT NULL,
        product_name TEXT,
        product_img TEXT,
        product_price TEXT,
        product_qty INTEGER NOT NULL,
        customer_id TEXT
    );`;
    await db.executeSql(query);
    // console.log(" After calling query ....")
};




export const getProducts = async (db: SQLiteDatabase, customerId: string): Promise<ProductInfo[]> => {
    // console.log("In get Products ");
    try {
        console.log('customerID received', customerId);
        const products: ProductInfo[] = [];
        const results = await db.executeSql('SELECT * FROM Cart WHERE customer_id = ?', [customerId]);


        // console.log("results => ", results);
        results.forEach(result => {
            for (let index = 0; index < result.rows.length; index++) {
                products.push(result.rows.item(index))
            }
        });
        // console.log("Products => ", products);
        return products;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get Products !!!');
    }

};

export const addProducts = async (db: SQLiteDatabase, ProductInfo: ProductInfo[]) => {


    // console.log("Product Id recevied => ", ProductInfo[0].product_id);
    // console.log("Product name recevied => ", ProductInfo[0].product_name);
    const insertQuery =
        `INSERT OR REPLACE INTO ${tableName}
        ( product_id,
            product_name,
            product_img,
            product_price,
            product_qty,
            customer_id
        ) VALUES (?, ?, ?, ?, ?, ?);`;
    const values = [
        ProductInfo[0].product_id,
        ProductInfo[0].product_name,
        ProductInfo[0].product_img,
        ProductInfo[0].product_price,
        ProductInfo[0].product_qty,
        ProductInfo[0].customer_id,
    ];
    return db.executeSql(insertQuery, values);

};

export const updateQuantity = async (db: SQLiteDatabase, productId: string, quantity: number) => {
    console.log('In Update Quantity');
    const updateQuery = `UPDATE Cart SET product_qty = ${quantity} WHERE product_id = ${productId}`;
    db.executeSql(updateQuery);

}


export const deleteProduct = async (db: SQLiteDatabase, productId: string) => {

    console.log("In Delete");
    console.log("product id to delete", productId);
    const deleteQuery = `DELETE from ${tableName} where product_id = ${productId}`;
    await db.executeSql(deleteQuery);
};

export const clearTable = async (db: SQLiteDatabase) => {
    console.log('in delete table function ');
    const query = `DELETE from ${tableName}`;
    await db.executeSql(query);
};


export const creatWishListTable = async (db: SQLiteDatabase) => {
    console.log("In create function 2");
    const query = `CREATE TABLE IF NOT EXISTS ${tableName2} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id TEXT NOT NULL,
        product_name TEXT,
        product_img TEXT,
        product_price TEXT,
        customer_id TEXT
    );`;
    await db.executeSql(query);
    console.log(" After calling query ....");

};

export const getWishListProducts = async (db: SQLiteDatabase, customerId: string): Promise<ProductInfo[]> => {
    console.log("In get WishList Products ");
    console.log("customer id in getwishList=>",customerId);
    try {
        const products: ProductInfo[] = [];
        const results = await db.executeSql(`SELECT * FROM ${tableName2} WHERE customer_id = ?`, [customerId]);

        console.log("results => ", results);
        results.forEach(result => {
            for (let index = 0; index < result.rows.length; index++) {
                products.push(result.rows.item(index))
            }
        });
        // console.log("Products => ", products);
        return products;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get Products !!!');
    }

};

export const addWishListProducts = async (db: SQLiteDatabase, ProductInfo: ProductInfo[]) => {

    console.log("In ADD to wish List");
    console.log("Product Id recevied => ", ProductInfo[0].product_id);
    console.log("Product name recevied => ", ProductInfo[0].product_name);
    console.log("Product img recevied => ", ProductInfo[0].product_img);
    console.log("Product price recevied => ", ProductInfo[0].product_price);
    console.log("Product customerID  recevied => ", ProductInfo[0].customer_id);
    const insertQuery =
        `INSERT OR REPLACE INTO ${tableName2}
( product_id,
    product_name,
    product_img,
    product_price,
    customer_id
) VALUES (?, ?, ?, ?, ?);`;
    const values = [
        ProductInfo[0].product_id,
        ProductInfo[0].product_name,
        ProductInfo[0].product_img,
        ProductInfo[0].product_price,
        ProductInfo[0].customer_id,
    ];
    return db.executeSql(insertQuery, values);

};



export const deleteWishListProduct = async (db: SQLiteDatabase, productId: string) => {

    console.log("In Delete");
    console.log("product id to delete", productId);
    const deleteQuery = `DELETE from ${tableName2} where product_id = ${productId}`;
    await db.executeSql(deleteQuery);
};


// export const createImageTable = async (db: SQLiteDatabase) => {
//     console.log("In create image Table");
//     const query = `CREATE TABLE IF NOT EXISTS Image (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         imageSrc TEXT,
//         customer_id TEXT
//     );`;
//     await db.executeSql(query);
//     console.log(" After calling query ....");

// };

// export const addImage = async (db: SQLiteDatabase, customerId: string, src: string) => {
//     const insertQuery =
//         `INSERT OR REPLACE INTO Image
//             ( 
//                 customer_id,
//                 imageSrc
//             ) VALUES (?, ?);`;
//     const values = [
//         customerId,
//         src,
//     ];
//     return db.executeSql(insertQuery, values);
// };

// export const getImage = async(db: SQLiteDatabase, customerId: string)=>{
//     try {
       
//         const result = await db.executeSql(`SELECT * FROM Image WHERE customer_id = ?`, [customerId]);

//         console.log("result", result);
//         // console.log("Products => ", products);
//         return result;
//     } catch (error) {
//         console.error(error);
//         throw Error('Failed to get Products !!!');
//     }
// }