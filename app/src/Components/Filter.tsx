import React, { useState } from "react";
import { Link, Redirect, NavLink } from "react-router-dom";

export default function Filter(props) {
  const url: any = { props };
  const [filter, setFilter] = useState(false);
  console.log(url);
  return (
    <div className="filter">
      <button
        onClick={() => {
          props.updateListSize(5);
        }}
      >
        Filter Last 5
      </button>
      {/* {filter ? <Redirect to={props.url} /> : ""} */}
    </div>
  );
}
