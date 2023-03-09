import React, { Component } from "react";

const Newsitem = (props) => {
  return (
    <div className="card my-3">
      <span
        className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
        style={{ left: "50%", zIndex: "1" }}
      >
        {"Source : "}
        {props.source}{" "}
      </span>
      <img
        src={props.imgUrl}
        className="card-img-top"
        alt="No Image Provided"
      />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.description}</p>
        <p className="card-text">
          <small className="text-danger">
            By {!props.author ? "Unknown" : props.author} on{" "}
            {new Date(props.date).toUTCString()}
          </small>
        </p>
        <a href={props.newsUrl} target="_blank" className="btn btn-sm btn-dark">
          Read more
        </a>
      </div>
    </div>
  );
};

export default Newsitem;
