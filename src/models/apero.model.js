const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const { multipleTsColumnSet } = require('../utils/unixts.utils');

class AperoModel {
    tableName = 'apero';

    find = async (params = {}) => {
        
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

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