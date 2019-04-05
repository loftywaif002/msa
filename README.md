# Emotional Data analysis from lrc data

## Dataset used

* [lrc-dataset](https://docs.google.com/spreadsheets/d/1qZ4DzdDQO8WjM5irCyhTuZ3RtoRQa80jJXQ_9WqpTfE/edit#gid=0)

## SDK used for lrc data analysis

* [Watson Developer Cloud Python SDK](https://github.com/watson-developer-cloud/python-sdk)

### Prerequisites

1. Python 3.6.* [Backend]
2. Node v8* 


### Run Project [open project using two terminals/tabs]

Backend Server setup
```
git clone https://github.com/loftywaif002/msa.git
cd msa
source env/bin/activate [activate the virtual environment]
pip install -r requirements.txt [install all the dependent library for back end]
python lrc-sentiment-analysis.py [run the server]
```

Front End

```
cd lsa-search
npm install
npm start
```

### How it works

![Alt text](msa/images/description.png?raw=true "How it works")