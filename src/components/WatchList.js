import React, { useState } from "react";

import { watchlist } from "../data/data";
import WacthListItem from "./WatchListItem";
import { DoughnutChart } from "./DoughnutChart";

const WatchList = () => {
  const labels = watchlist.map((subArray) => subArray["name"]);
  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      className="watchlist-container"
      style={{
        position: "fixed",
        top: "60px",               // offset below top menu height
        right: 0,
        height: "calc(100vh - 60px)",  // full height minus menu
        width: "500px",
        backgroundColor: "#fff",
        borderLeft: "1px solid #ccc",
        overflow: "hidden",         // prevent double scrollbars
        padding: "16px",
        boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
    >
      <div
        className="search-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          paddingBottom: "8px",
          zIndex: 1001,
        }}
      >
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
          style={{
            flexGrow: 1,
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <span className="counts" style={{ marginLeft: "10px", whiteSpace: "nowrap" }}>
          {watchlist.length} / 50
        </span>
      </div>

      <ul
        className="list"
        style={{
          maxHeight: "calc(100% - 250px)",  // leave space for chart + search
          overflowY: "auto",
          padding: 0,
          marginBottom: "16px",
        }}
      >
        {watchlist.map((stock, index) => {
          return <WacthListItem stock={stock} key={index} />;
        })}
      </ul>

      <div style={{ height: "220px" }}>
        <DoughnutChart data={data} />
      </div>
    </div>
  );
};

export default WatchList;
