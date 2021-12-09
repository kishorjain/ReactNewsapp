import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';


export class News extends Component {
    static defaultProps = {
        country: 'in',
        category: 'general',
        size: 4,
    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        size: PropTypes.number,

    }
    constructor() {
        super();

        this.state = {
            articles: [],
            loading: false,
            page: 1,

        }
    }
    async componentDidMount() {
        let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f7deda35a49843bdae3412a2488eb4c8&pageSize=${this.props.size}`;
        let data = await fetch(URL);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults });
    }
    handlepPrevClick = async () => {
        let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f7deda35a49843bdae3412a2488eb4c8&page=${this.state.page - 1}&pageSize=${this.props.size}`;
        this.setState({ loading: true });
        let data = await fetch(URL);
        this.setState({ loading: true });
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        });


    }
    handleNextClick = async () => {
        let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f7deda35a49843bdae3412a2488eb4c8&page=${this.state.page + 1}&pageSize=${this.props.size}`;
        this.setState({ loading: true });
        let data = await fetch(URL);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false
        });

    }

    render() {
        return (
            <div className="container">
                <h5 className="my-3 text-center">News Headlines</h5>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4 mt-3" key={element.url} >
                            <NewsItem title={element.title ? element.title : "No News"} description={element.description ? element.description : "No News"} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedDate={element.publishedAt} source={element.source.name}/>
                        </div>

                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page === 1 ? true : false} className="btn btn-dark" onClick={this.handlepPrevClick}>&larr; Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.size)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>


        )
    }
}

export default News
