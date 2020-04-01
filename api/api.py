import time
import urllib.request, json
from flask import Flask

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/data')
def get_data():
	with urllib.request.urlopen("https://covidtracking.com/api/states") as url:
	    data = json.loads(url.read().decode())
	    first = data[0]
	    print(first)
	return first