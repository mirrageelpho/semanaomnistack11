const colors = require('./utils/terminalColors');
const app = require('./app');

const port = 3333

app.listen(port, ()=>console.log(colors.yellow+`Online na porta: ${port}`))