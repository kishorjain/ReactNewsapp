import React, {useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
    
    
    const [articles,setArticles]= useState([]);
    const [loading,setLoading] = useState(false);
    const [page,setPage] = useState(1);
    const [totalResults, setTotalResult] = useState(0);
    
    
    const componentDidMount=async()=> {
        props.setProgress(0);
        let URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api_key}&page=${page}&pageSize=${props.size}`;
        let data = await fetch(URL);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setTotalResult(parsedData.totalResults);
        props.setProgress(100);
    }

    const fetchMoreData = async () => {

        
        let URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api_key}&page=${page+1}&pageSize=${props.size}`;
        setPage(page+1);
        setLoading(true);
        let data = await fetch(URL);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResult(parsedData.totalResults);
        setLoading(false);
       
    };
    useEffect(() => {
        componentDidMount();
    }, [])//don't remove array bractes it will call api infinet times

    
        return (
            <>
                <h5 className="my-3 text-center">News Headlines</h5>
                
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4 h-100 mt-3" key={element.url} >
                                    <NewsItem title={element.title ? element.title : "No News"} description={element.description ? element.description : "No News"} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedDate={element.publishedAt} source={element.source.name} />
                                </div>

                            })}
                        </div>
                    </div>
                </InfiniteScroll>

            </>


        )
    
}

News.defaultProps = {
    country: 'in',
    category: 'general',
    size: 4,
}
News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    size: PropTypes.number,

}

export default News
