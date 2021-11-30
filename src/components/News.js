import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor(){
        super();
        
            this.state = {
                articles:[],
                loading :false,
                page:1,
                
            }
    }
    async componentDidMount(){
        let URL="https://newsapi.org/v2/top-headlines?country=in&apiKey=f7deda35a49843bdae3412a2488eb4c8&pageSize=20";
        let data = await fetch(URL);
        let parsedData= await data.json();
        this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults}); 
    }
    handlepPrevClick = async()=>{
        let URL=`https://newsapi.org/v2/top-headlines?country=in&apiKey=f7deda35a49843bdae3412a2488eb4c8&page=${this.state.page-1}&pageSize=20`;
        let data = await fetch(URL);
        let parsedData= await data.json();
        this.setState({
            page:this.state.page-1,
            articles:parsedData.articles}); 
        

    }
    handleNextClick = async ()=>{
            let URL=`https://newsapi.org/v2/top-headlines?country=in&apiKey=f7deda35a49843bdae3412a2488eb4c8&page=${this.state.page+1}&pageSize=20`;
            let data = await fetch(URL);
            let parsedData= await data.json();
            this.setState({
                page:this.state.page+1,
                articles:parsedData.articles}); 
        

    }

    render() {
        return (
            <div className="container">
                <h5 className="my-3 text-center">News Monkey Headlines</h5>
                <div className="row">
                    {this.state.articles.map((element)=>{
                    return <div className="col-md-4 mt-3" key={element.url} >
                                <NewsItem title={element.title?element.title:"No News"} description={element.description?element.description:"No News"} imageUrl={element.urlToImage} newsUrl={element.url}/>
                            </div>

                    })}
                </div>
                <div className="container d-flex justify-content-between">
                <button type="button" disabled={this.state.page===1?true:false} className="btn btn-dark" onClick={this.handlepPrevClick}>&larr; Previous</button>
                <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/20)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
            
            
        )
    }
}

export default News
