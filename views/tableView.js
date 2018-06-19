const Table = require('cli-table');
const generateView = (tableConstructor, tableContent, tableTitle)=>{
    const mainTable = new Table(tableConstructor);
    tableContent.forEach((item)=>{
        mainTable.push(item);
    });
    console.log('');
    console.log(' '+tableTitle);
    console.log(mainTable.toString());
}
module.exports = {generateView};