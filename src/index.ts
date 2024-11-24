import express from 'express';
import cors from 'cors';
import routes from './rest/router';
import { Server as HttpServer, createServer as createHttpServer } from 'http';
import startSocketServer from './socket/SocketServer';

const app = express();

app.use(cors());
app.use(express.json());

// express api
app.use('/', routes);

let httpServer: HttpServer;
httpServer = createHttpServer(app);

startSocketServer(httpServer);

httpServer.listen(3005, () => {
  console.info(`Listening on 3005`);
});