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
        state_data = meta_json.get(state, None)
        if not state or not date or not state_data:
            continue

        tConfirmed = d.get('positive', None)
        dConfirmed = d.get('positiveIncrease', None)
        tTested = d.get('totalTestResults', None)
        dTested = d.get('totalTestResultsIncrease', None)
        tHospitalized = d.get('hospitalized', None)
        dHospitalized = d.get('hospitalizedIncrease', None)
        tDeath = d.get('death', None)
        dDeath = d.get('deathIncrease', None)
        pop = state_data.get("population")
        density = state_data.get("density")

        pPopulation = "{:.2f}".format(tTested / pop * 100) if tTested and pop and pop != 0 else None
        pTested = "{:.2f}".format(tConfirmed / tTested * 100) if tConfirmed and tTested and tTested != 0 else None
        pHospitalized = "{:.2f}".format(tDeath / tHospitalized * 100) \
            if tDeath and tHospitalized and tHospitalized != 0 \
            else None
        pConfirmed = "{:.2f}".format(tHospitalized / tConfirmed * 100) \
            if tHospitalized and tConfirmed and tConfirmed != 0 \
            else None
        confirmedPercentageIncrease = "{:.2f}".format(dConfirmed / (tConfirmed - dConfirmed) * 100) \
            if dConfirmed and tConfirmed and tConfirmed - dConfirmed != 0 \
            else None
        testedPercentageIncrease = "{:.2f}".format(dTested / (tTested - dTested) * 100) \
            if dTested and tTested and tTested - dTested != 0 \
            else None
        processed.append({
            "date": date,
            "state": state,
            "population": pop,
            "density": density,
            "tTested": tTested,
            "dTested": dTested,
            "pPopulation": pPopulation,
            "pTested": pTested,
            "pHospitalized": pHospitalized,
            "tConfirmed": tConfirmed,
            "pConfirmed": pConfirmed,
            "dConfirmed": dConfirmed,
            "confirmedPercentageIncrease": confirmedPercentageIncrease,
            "testedPercentageIncrease": testedPercentageIncrease,
            "tHospitalized": tHospitalized,
            "dHospitalized": dHospitalized,
            "tDeath": tDeath,
            "dDeath": dDeath
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
