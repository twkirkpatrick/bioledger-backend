const express = require("express");
const app = express();

//* Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

//*Initialize server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
