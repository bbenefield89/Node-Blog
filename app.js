const express = require('express');
const cors = require('cors');

const app = express();
const api = require('./routes');
const port = 5000;

app.use(express.json());
app.use(cors());
app.use('/api/users', api.usersRoutes);

app.listen(port, () => console.log(`Server listening on port: ${ port }`));