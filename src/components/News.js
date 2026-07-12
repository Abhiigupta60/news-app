import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
   country: 'in',
   pageSize : 8
  }

  
    
 static PropTypes = {
    country : PropTypes.string,
    pageSize : this.propTypes
  }


  constructor(){
    super();
    this.state ={ 
      articles: [],
      loading : false,
      page: 1
    }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a7705a8645614a25a346ce63b44d68dc&page=1";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles });
  }

  handlepreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a7705a8645614a25a346ce63b44d68dc&page=${this.state.page - 1}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page : this.state.page - 1,
      articles: parsedData.articles,
       loading: false

    });
  }

  handleNextClick = async () => {
    console.log("Next");
    if (!(this.state.page +1> Math.ceil(this.state.totalResult/20))){
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a7705a8645614a25a346ce63b44d68dc&page=${this.state.page + 1}`;
    this.setState({loading: true});
    let data = await fetch(url);
    
    let parsedData = await data.json();
     this.setState({loading: false});
    this.setState({
      page : this.state.page + 1,
      articles: parsedData.articles,
      loading: false
    });
  }
}

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - Top Headlines</h1>
        {this.state.loading &&<Spinner/>}
      

        <div className="row">
          {!this .state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 40) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlepreviousClick}
          >
            ← previous
          </button>

          <button
           disabeld = {this.state.page +1> Math.ceil(this.state.totalResult/20)} type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            next →
          </button>
        </div>
      </div>
    );
  }
}

export default News;
