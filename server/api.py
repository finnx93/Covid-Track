import urllib.request, json
from flask import Flask

def get_historic_data():
	with urllib.request.urlopen("https://covidtracking.com/api/states/daily ") as url:
	    data = json.loads(url.read().decode())
	    return data

def get_daily_data():
	with urllib.request.urlopen("https://covidtracking.com/api/states") as url:
	    data = json.loads(url.read().decode())
	    return data

app = Flask(__name__)

@app.route('/ping')
def ping():
    return "\npong\n"


@app.route('/historic')
def get_data():
	return get_historic_data()