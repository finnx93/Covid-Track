import urllib.request, json
from flask import Flask

with open('state_mata.json') as f:
    meta_json = json.load(f)


def get_historic_data():
    with urllib.request.urlopen("https://covidtracking.com/api/states/daily ") as url:
        data = json.loads(url.read().decode())
        return data


def get_daily_data():
    with urllib.request.urlopen("https://covidtracking.com/api/states") as url:
        data = json.loads(url.read().decode())
        return data


def process_data(data):
    processed = []
    for d in data:
        date = d.get('date', None)
        state = d.get('state', None)
        tTested = d.get('totalTestResults', -1)
        tConfirmed = d.get('positive', -1)
        tHospitalized = d.get('hospitalized', -1)
        tDeath = d.get('death', -1)

        if not state or not date or not tTested or not tConfirmed or not tHospitalized or not tDeath:
            continue
        state_data = meta_json.get(state, None)
        if not state_data:
            continue
        
        population = state_data.get("population")
        processed.append({
            "date": date,
            "state": state,
            "population": population,
            "density": state_data.get("density"),
            "tTested": tTested,
            "dTested": d.get('totalTestResultsIncrease', -1),
            "pPopulation": "{:.2f}".format(tTested / population * 100),
            "pTested": "{:.2f}".format(tConfirmed / tTested * 100),
            "pHospitalized":"{:.2f}".format(tDeath / tHospitalized * 100),
            "tConfirmed": tConfirmed,
            "pConfirmed": "{:.2f}".format(tHospitalized / tConfirmed * 100),
            "dConfirmed": d.get('positiveIncrease', -1),
            "dConfirmedPercentage": "{:.2f}".format(d.get('positiveIncrease') / d.get('positive') * 100) if d.get(
                'positive', None) and d.get(
                'positiveIncrease', None) else None,
            "tHospitalized": tHospitalized,
            "dHospitalized": d.get('hospitalizedIncrease', None),
            "tDeath": tDeath,
            "dDeath": d.get('deathIncrease', None)
        })
    return processed


# ########### Endpoint handlers  ###############

app = Flask(__name__)


@app.route('/ping')
def ping():
    return "\npong\n"


@app.route('/historic')
def get_data():
    data = get_historic_data()
    processed_data = process_data(data)
    serialized_data = json.dumps(processed_data)
    return serialized_data
