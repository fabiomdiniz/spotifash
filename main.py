from flask import Flask
import os
ROOT = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, static_folder=os.path.join(ROOT), static_url_path='/static')

@app.route("/")
def hello():
    return "Hello World!"


@app.route("/<path:path>")
def static_proxy(path):
    return app.send_static_file(path)

if __name__ == "__main__":
    app.run()
