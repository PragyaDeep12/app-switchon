import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

export default function Filter(props) {
  const url: any = { props };
  const [filter, setFilter] = useState(false);
  console.log(url);
  return (
    <div className="filter">
      <button
        onClick={() => {
          setFilter(true);
        }}
      >
        Filter
      </button>
      {/* {filter ? <Redirect to={props.url} /> : ""} */}
    </div>
  );
}
