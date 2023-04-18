const PORT = process.argv.slice(2)[0] ?? 8080;
const mongoUrl = process.env.MONGO_URI;
const persistence = process.env.PERSISTENCE;

module.exports =  {mongoUrl, PORT, persistence};
