const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const { multipleTsColumnSet } = require('../utils/unixts.utils');

class AperoModel {
    tableName = 'apero';
    tableNameSecond = 'apero_topic';

    find = async (params = {}) => {
        
        let sql = `SELECT ${this.tableNameSecond}.aperoId, ${this.tableName}.apero_date, ${this.tableName}.image, ${this.tableNameSecond}.id as topicId, ${this.tableNameSecond}.name, ${this.tableNameSecond}.description FROM ${this.tableName}, ${this.tableNameSecond} WHERE ${this.tableNameSecond}.aperoId = ${this.tableName}.id`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` AND ${this.tableName}.${columnSet}`;
        console.log(sql);

        return await query(sql, [...values]);

    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT ${this.tableName}.id as aperoId, ${this.tableName}.apero_date, ${this.tableName}.image, ${this.tableNameSecond}.id as topicId, ${this.tableNameSecond}.name, ${this.tableNameSecond}.description  FROM ${this.tableName}, ${this.tableNameSecond} 
        WHERE ${this.tableNameSecond}.aperoId = ${this.tableName}.id AND ${this.tableName}.${columnSet} ORDER BY aperoId ASC`;
        console.log(sql);

        const result = await query(sql, [...values]);
        

        // return back the first row (user)
        return result[0];
    }


    create = async ({ apero_date, image }) => {
        const sql = `INSERT INTO ${this.tableName}
        (apero_date, image) VALUES (UNIX_TIMESTAMP(?), ?)`;

        const result = await query(sql, [apero_date, image]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleTsColumnSet(params);

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;

        console.log(sql);

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new AperoModel;