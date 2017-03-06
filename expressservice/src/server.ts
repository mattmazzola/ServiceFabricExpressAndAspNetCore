import * as express from "express";
import * as util from './util';
import * as fs from 'fs';
import * as path from 'path';

console.log(process.argv);

main();

async function main() {
    const endpointsPath = path.join(__dirname, '..', '..', 'ExpressPkg.Endpoints.txt');
    console.log(endpointsPath);

    const endpointsFile = await util.promisify<string>(fs.readFile)(endpointsPath, 'utf8');
    console.log(`EndpointsFile: ${endpointsFile}`);

    // Extract values from EndpointsFile: 'ExpressTypeEndpoint;http;Input;30004;;http;'
    const [name, protocol, type, port, x, scheme, pathSuffix] = endpointsFile.split(';');
    const app = express();

    app.get('/', (req, res) => {
        console.log('Service Fabric: Express app is wokring!');
        res.status(200).send('Hello World!');
    });

    app.get('/args', (req, res) => {
        console.log(process.argv);
        res.status(200).send(process.argv);
    });

    const listenPort = port || process.env.PORT || 30031;
    app.listen(listenPort, () => {
        console.log(`Application is listening on port: ${listenPort}`);
    });
}