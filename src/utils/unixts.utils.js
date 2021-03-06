exports.multipleTsColumnSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);
    const values = Object.values(object);

    columnSet = keys.map(key => 
        {
            if(key === 'apero_date') {
                return `${key} = UNIX_TIMESTAMP(?)`
            }
            else{
               return `${key} = ?`
            }
        }
        ).join(', ');

 
    return {
        columnSet,
        values
    }
}
