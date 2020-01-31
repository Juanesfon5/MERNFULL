require('dotenv').config();

const app = require('./app');
require('./database');
const uniPi = require('./evokUnipi.js');
require('./evok');


async function main() {
    await app.listen(app.get('port'));
    console.log('Server on port' , app.get('port'));
    //uniPi.connectUnipi();
    //uniPi.getInitialInputs();
}

main();