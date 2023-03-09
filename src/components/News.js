import React, { useState, useEffect } from "react";
import Newsitem from "./Newsitem.js";
import Spinner from "./Spinner.js";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  const captalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const updateNews = async () => {
    props.setProgress(10);

    let myurl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    props.setProgress(30);
    let data = await fetch(myurl);
    props.setProgress(50);
    let parseData = await data.json();
    props.setProgress(75);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    setPage(page+1);
    props.setProgress(100);
  };
  useEffect(() => {
    document.title = `${captalizeFirstLetter(
        props.category
      )}  - Katra News`;
    updateNews();
  }, []);
  const fetchMoreData = async () => {
    console.log(page);

    let myurl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(myurl);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setPage(page+1);
  };
  return (
    <>
      <h2 className="text-center my-4">
        Katra News - Top {captalizeFirstLetter(props.category)} Headlines
      </h2>
      {/* {loading && <Spinner />} */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container my-3">
          <div className="row">
            {!loading &&
              articles.map((elem) => {
                // if (elem.urlToImage != null) {
                return (
                  <div className="col-md-4" key={elem.url}>
                    <Newsitem
                      title={elem.title}
                      description={elem.description}
                      imgUrl={elem.urlToImage}
                      newsUrl={elem.url}
                      author={elem.author}
                      date={elem.publishedAt}
                      source={elem.source.name}
                    />
                  </div>
                );
                // }
              })}
          </div>
        </div>
      </InfiniteScroll>
      
    </>
  );
};
News.defualtProps = {
  country: "US",
  pageSize: 10,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
