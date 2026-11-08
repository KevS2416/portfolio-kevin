"""Run:  python app.py   then open http://localhost:8000
For your phone (same Wi-Fi): open http://<your-PC-IP>:8000"""
import http.server, json, socket
from datetime import datetime

PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/send':
            size = int(self.headers.get('Content-Length', 0))
            data = json.loads(self.rfile.read(size))
            with open('messages.txt', 'a', encoding='utf-8') as f:
                f.write(f"[{datetime.now():%Y-%m-%d %H:%M}] {data['name']}: {data['message']}\n")
            self.send_response(200); self.end_headers(); self.wfile.write(b'ok')
        else:
            self.send_error(404)

ip = socket.gethostbyname(socket.gethostname())
print(f"Portfolio running!\n  PC:    http://localhost:{PORT}\n  Phone: http://{ip}:{PORT}")
http.server.ThreadingHTTPServer(('', PORT), Handler).serve_forever()
