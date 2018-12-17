from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
import json
from watson_developer_cloud import NaturalLanguageUnderstandingV1
from watson_developer_cloud.natural_language_understanding_v1 import Features, EmotionOptions
from flask_cors import CORS
app = Flask(__name__)
api = Api(app)
CORS(app)
class Sentiments(Resource):
    def post(self):
      data = request.data.decode('utf-8')
      dataDict = json.loads(data)
      natural_language_understanding = NaturalLanguageUnderstandingV1(
        version='2018-11-16',
        iam_apikey='H61lzMxZfTcrmkMhz1_i6fvlxj0ljGVR04EnLKOJpGW1',
        url='https://gateway.watsonplatform.net/natural-language-understanding/api'
        )
      response = natural_language_understanding.analyze(
        text=dataDict['line'],
        features=Features(emotion=EmotionOptions())).get_result()
      return response

api.add_resource(Sentiments, '/sentiments') # Route_1

if __name__ == '__main__':
     app.run(port='5002', debug=False)