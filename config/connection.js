const { connect, connection } = require("mongoose");
// my database name is movies. Note that it appears before the ? in the string ⬇️
const connectionString =
  "mongodb+srv://finalgirl321:finalgirl@cluster0.2smbg.mongodb.net/movies?retryWrites=true&w=majority";

connect(connectionString);

module.exports = connection;
