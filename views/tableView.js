const Table = require('cli-table');
/**
 * function generateView will generate cli table ui
 * @param {object} tableConstructor {head:[], colWidths: []}
 * @param {object} tableContent {[],[]}
 * @param {string} tableTitle title 
 */
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