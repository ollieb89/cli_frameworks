import http from 'http';
import { URL } from 'url';

export class OAuthServer {
  static async waitForCode(port: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const server = http.createServer((req, res) => {
        try {
            const url = new URL(req.url || '/', `http://localhost:${port}`);
            const code = url.searchParams.get('code');
            const error = url.searchParams.get('error');

            if (code) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
                    <h1>Authentication Successful!</h1>
                    <p>You have successfully logged in.</p>
                    <p>You can close this window and return to the CLI.</p>
                    <script>window.close()</script>
                </body>
                </html>
            `);
            resolve(code);
            server.close(); // Stop server after success
            } else if (error) {
                res.writeHead(400, { 'Content-Type': 'text/html' });
                res.end(`<h1>Authentication Failed</h1><p>${error}</p>`);
                reject(new Error(error));
                server.close();
            } else {
                if (req.url === '/favicon.ico') {
                    res.writeHead(404);
                    res.end();
                    return;
                }
                // Any other request (maybe redirect landing)
                res.writeHead(404);
                res.end('Waiting for callback...');
            }
        } catch (e) {
            reject(e);
            server.close();
        }
      });
      
      server.listen(port, () => {
        // console.log(`Listening on ${port}...`);
      });
      
      server.on('error', (err) => {
        reject(err);
        server.close();
      });
    });
  }
}
