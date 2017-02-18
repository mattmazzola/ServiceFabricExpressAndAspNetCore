import * as express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send(200, 'Hello World!');
});

const port = process.env.PORT || 30031;
app.listen(port, () => {
    console.log(`Application is listening on port: ${port}`);
});