from flask import Flask, jsonify, render_template
import sqlite3
import asyncio

app = Flask(__name__)
db = "/some/path/later/"

@app.route("/")
def index():
	return render_template("index.html")

if __name__ == '__main__':
	app.run(debug=True)
