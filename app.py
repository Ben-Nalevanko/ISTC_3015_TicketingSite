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

@app.route("/get_events", methods=["GET"])
def get_events():
	return

@app.route("get_map", methods=["GET"]):
def get_map():
	return

@app.route("buy_ticket", methods=["POST"])
def buy_ticket():
	return

if __name__ == '__main__':
	app.run(debug=True)
