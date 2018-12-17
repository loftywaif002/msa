import React, {Component} from "react";
import {
  ReactiveBase,
  DataSearch,
  MultiDataList,
  RangeSlider,
  DateRange,
  MultiList,
  SingleRange,
  SelectedFilters,
  ResultCard
} from "@appbaseio/reactivesearch";
import axios from 'axios'
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.emotions = {}
    this.mainLyrics = {"line":''}
    this.handleSentiments = this.handleSentiments.bind(this)
    this.getResult = this.getResult.bind(this)
    this.state = {
      isClicked: false,
      message: "🔬Show Filters",
      sentiments: {}
    };
  }

  handleClick() {
    this.setState({
      isClicked: !this.state.isClicked,
      message: this.state.isClicked ? "🔬 Show Filters" : "🎬 Show Data"
    });
  }
  handleSentiments(text){
    var headers = {
      'Content-Type': 'application/json'
     }
     axios.post('http://127.0.0.1:5002/sentiments', text, {headers: headers})
     .then((response) => {
       this.emotions = response.data.emotion.document.emotion
       console.log(this.emotions.sadness)
     })
     .catch((error) => {
       console.log(error)  
     })
  }

  getResult(){
    this.handleSentiments(this.mainLyrics)
    setTimeout(()=>{
     this.setState({ sentiments:this.emotions})
    },3000)
  }
  render() {
    var that = this
    return (
      <div className="main-container">
        <ReactiveBase
          app="lrc-analysis"
          credentials="NUyhWFhYo:a2fadde4-9313-4445-a5fd-2c84d3633da3"
          theme={{
            typography: {
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif',
              fontSize: "16px"
            },
            colors: {
              textColor: "#fff",
              backgroundColor: "#212121",
              primaryTextColor: "#fff",
              primaryColor: "#2196F3",
              titleColor: "#fff",
              alertColor: "#d9534f",
              borderColor: "#666"
            }
          }}
        >
          <div className="navbar">
            <div className="logo-container">
              <img
                className="app-logo"
                src="Images/gifnote.jpg"
                alt="MovieSearch"
              />
            </div>

            <div className="search-container">
              <DataSearch
                componentId="mainSearch"
                dataField={["title"]}
                categoryField="title"
                className="search-bar"
                queryFormat="and"
                placeholder="Search for song title..."
                iconPosition="left"
                autosuggest={false}
                filterLabel="search"
              />
              <button className="btn draw-border" onClick={this.getResult}> GET RESULT </button>
            </div>
            
          </div>
          <div className="sub-container">
            <div
              className={
                this.state.isClicked ? "left-bar-optional" : "left-bar"
              }
            >
            </div>
            <div
              className={
                this.state.isClicked
                  ? "result-container-optional"
                  : "result-container"
              }
            >
              <SelectedFilters
                showClearAll={true}
                clearAllLabel="Clear filters"
              />

              <ResultCard
                componentId="results"
                dataField="original_title"
                react={{
                  and: [
                    "mainSearch",
                    "RangeSlider",
                    "language-list",
                    "date-filter",
                    "genres-list",
                    "revenue-list"
                  ]
                }}
                pagination={true}
                className="Result_card"
                paginationAt="bottom"
                pages={5}
                size={12}
                Loader="Loading..."
                noResults="No results were found..."
                onData={function(res) {
                
                  var lyrics = ''
                  let data = res.lrc
                  for(let i=0; i< data.length; i++){
                    let cleanData =data[i].replace(/(['"\\\{\[\]\}])/g, '').split(":")
                    
                    for(let j = 0; j<cleanData.length; j++){
                      if(cleanData[j]=="line"){
                        lyrics += cleanData[j+1]+" "
                      }
                    }
                  }
                
                 that.mainLyrics.line = lyrics
                
                  return {
                    description: (
                      <div className="main-description">
                                  <div className="sub-title language-data">
                                    <b>
                                      Songs Sentiments: <br /> <br />
                                      <span className="details">
                                        "Sadness": {that.state.sentiments.sadness}
                                      </span>
                                      <br />
                                      <span className="details">
                                        "Joy": {that.state.sentiments.joy}
                                      </span>
                                      <br />
                                      <span className="details">
                                        "Fear": {that.state.sentiments.fear}
                                      </span>
                                      <br />
                                      <span className="details">
                                        "Disgust": {that.state.sentiments.disgust}
                                      </span>
                                      <br />
                                      <span className="details">
                                        "Anger": {that.state.sentiments.anger}
                                      </span>
                                      <br />
                                    </b>
                                  </div>
                                </div>
                    )
                  };
                }}
              />
            </div>

            <button
              className="toggle-button"
              onClick={this.handleClick.bind(this)}
            >
              {this.state.message}
            </button>
          </div>
        </ReactiveBase>
      </div>
    );
  }
}

export default App;