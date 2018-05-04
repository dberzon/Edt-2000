import * as http from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

export default class SocketServer {
    private app: express.Application;
    private httpServer: http.Server;
    private ioServer: socketIo.Server;
    private port: number = 8080;

    constructor() {
        this.app = express();
        this.httpServer = http.createServer(this.app);

        this.ioServer = socketIo(this.httpServer);

    }

    start () {
        this.httpServer.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
        //
        this.ioServer.on('connect', (socket: any) =>{
            console.log('Connected client on port %s.', this.port);

            socket.on('message', (m: any) => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.ioServer.emit('message', { 'received': m.key });
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }
}