from flask import Flask, jsonify, render_template, request, redirect, url_for, session
from flask_bcrypt import Bcrypt
import sqlite3
import asyncio
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
db = "/some/path/later/"
app.secret_key = "something to put in an env file"
bcrypt = Bcrypt(app)


users = {
'admin': bcrypt.generate_password_hash('password123').decode('utf-8')
}
#temporary, will come from database once we have it
events =[]

#temporary until we get a db connection set up
data = [
	["Event One Name", "Event One Location"],
	["Event Two Name", "Event Two Locattion"],
	["Event Three Name", "Event Three Location"]
	]

users = {
	'admin': bcrypt.generate_password_hash('password123').decode('utf-8')
}

# Directory to store uploaded map images
UPLOAD_FOLDER = 'static/uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}


@app.route("/")
def index():
	if "user" in session:
		return render_template("index.html", events=events, data=data)
	return redirect(url_for("login"))

@app.route('/login', methods=['GET', 'POST'])
def login():
	if request.method == 'POST':
		username = request.form['username']
		password = request.form['password']

		# Check if the user exists and password matches
		if username in users and bcrypt.check_password_hash(users[username], password):
			session['user'] = username# Store username in session
			return redirect(url_for('index'))
		else:
			return 'Invalid login credentials. Please try again.'

	return render_template('login.html')

@app.route('/logout')
def logout():
	session.pop('user', None)
	return redirect(url_for('login'))

@app.route('/register', methods=['GET', 'POST'])
def register():
	if request.method == 'POST':
		username = request.form['username']
		password = request.form['password']
		print(username)
		print(password)
		print("\nExistingusers: ")

		if username not in users:
			print("Not in users")
			users[username] = bcrypt.generate_password_hash(password).decode('utf-8')
			session['user'] = username# Automatically log in after registering
			return redirect(url_for('index'))
		else:
			return render_template ("register.html", response='Username already exists. Please choose a different username.')

	return render_template('register.html')


@app.route("/serve-create-event", methods=["GET"])
def serve_create_event():
	print("serve_create_event")
	return render_template("create_event.html")

@app.route("/purchase_page")
def purchase_page():
	return render_template("purchase_page.html")

@app.route('/create_event', methods=['GET', 'POST'])
def create_event():
	if 'user' not in session:
		return redirect(url_for('login'))

	if request.method == 'POST':
		event_name = request.form['event_name']
		event_location = request.form['event_location']
		event_date = request.form['event_date']

		# Handle the uploaded map image
		if 'map_image' in request.files:
			file = request.files['map_image']
			if file and allowed_file(file.filename):
				filename = secure_filename(file.filename)
				file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
				map_url = url_for('static', filename=f'uploads/{filename}')
			else:
				map_url = None
		else:
			map_url = None

		# Add the event to the events list
		events.append({
			'name': event_name,
			'location': event_location,
			'date': event_date,
			'created_by': session['user'],
			'map_url': map_url
		})
		return redirect(url_for('index'))

	return render_template('create_event.html')

@app.route("/buy_ticket", methods=["POST"])
def buy_ticket():
	event_name = request.form.get("event_name")
	print(event_name)
	return render_template("purchase_page.html", event_name=event_name)

if __name__ == '__main__':
	app.run(debug=True)
