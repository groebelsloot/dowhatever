#flask imports
from flask import Flask
from flask import render_template, abort, session, redirect, url_for
from flask import request, Response, send_from_directory

#standard python
import json


#initialise the application object
app = Flask(__name__)

app.config.from_object('settings.Config')

app.debug = app.config['DEBUG']

"""------------------------------------------------------------------------------
LOADING RECIPES FROM JSON FILES
------------------------------------------------------------------------------"""
@app.before_first_request
def serverInit():
	pass

"""------------------------------------------------------------------------------
UNIFIED DEFAULT SUCCESS & ERROR RESPONSE FUNCTIONS
------------------------------------------------------------------------------"""

def getErrorMessage(msg):
	return json.dumps({'error' : msg})

def getSuccessMessage(msg, data):
	return json.dumps({'success' : msg, 'data' : data})


"""------------------------------------------------------------------------------
PING / HEARTBEAT ENDPOINT
------------------------------------------------------------------------------"""

@app.route('/ping')
def ping():
	return Response('pong', mimetype='text/plain')

"""------------------------------------------------------------------------------
STATIC PAGES THAT DO NOT USE THE COMPONENT LIBRARY
------------------------------------------------------------------------------"""

@app.route('/')
def home():
	return render_template('index.html')

@app.route('/robots.txt')
@app.route('/sitemap.xml')
def static_from_root():
	return send_from_directory(app.static_folder, request.path[1:])

@app.route('/favicon.jpeg')
def favicon():
	return getFavicon()

"""------------------------------------------------------------------------------
ERROR HANDLERS
------------------------------------------------------------------------------"""

#TODO fix the underlying template
@app.errorhandler(404)
def page_not_found(e):
	return render_template('404.html'), 404

@app.errorhandler(500)
def page_not_found(e):
	return render_template('500.html'), 500

#main function that will run the server
if __name__ == '__main__':
	app.run(port=app.config['APP_PORT'], host=app.config['APP_HOST'])
