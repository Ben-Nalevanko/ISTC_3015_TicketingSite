from flask import Flask, jsonify, render_template
import sqlite3
import asyncio

app = Flask(__name__)
db = "/some/path/later/"

#temporary until we get a db connection set up
data = [
	["Event One Name", "Event One Location"],
	["Event Two Name", "Event Two Locattion"],
	["Event Three Name", "Event Three Location"]
	]
@app.route("/")
def index():
	return render_template("index.html", data = data)

if __name__ == '__main__':
	app.run(debug=True)
