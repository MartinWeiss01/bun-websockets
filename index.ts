import { type Serve } from "bun";

let sockets = [

]

export default {
  fetch(req, server) {
    const url = new URL(req.url)
    if (url.pathname === '/live') {
      if (server.upgrade(req)) {
        return;
      }
      return new Response("Upgrade failed :(", { status: 500 })
    }
    return new Response(`Bun!`);
  },
  websocket: {
    message(ws, message) {
      console.log(`[Message received]: ${message} from ${ws}`);
    }, // a message is received
    open(ws) {
      console.log(`[Connection opened]: ${ws}`);
    }, // a socket is opened
    close(ws, code, message) {
      console.log(`[Connection closed]: ${ws} ${code} ${message}`);
    }, // a socket is closed
    drain(ws) {
      console.log(`[Drain]: ${ws}`);
    }, // the socket is ready to receive more data
  },
} satisfies Serve;


// console.log(`Listening on http://localhost:${server.port}...`);
