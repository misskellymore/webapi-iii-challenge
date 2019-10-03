// code away!

require('dotenv').config();

const server = require('./server.js');


// ask tl about process
const port = process.env.PORT;

server.listen(port, () => {
    console.log(`\n*** Server running on http://localhost:${port}`);
});
