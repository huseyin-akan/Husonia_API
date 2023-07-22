const operatorMap = {'>' : '$gt', '>=' : '$gte', '=' : '$eq', '<' : '$lt', '<=' : '$lte'}

const addNumericFiltersToQueryObj = (queryObject, filterInput, options) => {
    const regEx = /\b(<|>|>=|<=|=)\b/g;
    let result = filterInput.replace(regEx, (match) => `-${operatorMap[match]}-`);
    
    result = result.split(',').forEach( (item) => {
        const [field, operator, value] = item.split('-');
        
        if(options.includes(field))
            queryObject[field] = {[operator]:Number(value) };
    })
}

module.exports = [addNumericFiltersToQueryObj];