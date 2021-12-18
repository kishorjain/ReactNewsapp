import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
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
            totalResults: 0,

        }
    }
    async componentDidMount() {
        let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f7deda35a49843bdae3412a2488eb4c8&page=${this.state.page}&pageSize=${this.props.size}`;
        let data = await fetch(URL);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults });
    }

    fetchMoreData = async () => {

        this.setState({ page: this.state.page + 1 })
        let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f7deda35a49843bdae3412a2488eb4c8&page=${this.state.page}&pageSize=${this.props.size}`;
        this.setState({ loading: true }); 
        let data = await fetch(URL);
        let parsedData = await data.json();
        this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults, loading: false });
    };


    render() {
        return (
            <>
                <h5 className="my-3 text-center">News Headlines</h5>
                {/*this.state.loading && <Spinner />*/}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4 mt-3" key={element.url} >
                                    <NewsItem title={element.title ? element.title : "No News"} description={element.description ? element.description : "No News"} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedDate={element.publishedAt} source={element.source.name} />
                                </div>

                            })}
                        </div>
                    </div>
                </InfiniteScroll>

            </>


        )
    }
}

export default News
