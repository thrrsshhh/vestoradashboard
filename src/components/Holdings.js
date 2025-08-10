import React, { useEffect, useState } from "react";
import axios from "axios";

import { VerticalGraph } from "./VerticalGraph";
import { useAuth } from "../hooks/useAuth";
import { holdings as localHoldings } from "../data/data.js"; // adjust path as needed

const Holdings = () => {
  const [allHoldings, SetAllHoldings] = useState([]);
  let { user } = useAuth();

  useEffect(() => {
    axios
      .get("https://vestorabackendd.onrender.com/holdings/index", {
        headers: {
          Authorization: user,
        },
      })
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          SetAllHoldings(res.data);
        } else {
          SetAllHoldings(localHoldings); // fallback to local data if API returns empty
        }
      })
      .catch(() => {
        SetAllHoldings(localHoldings); // fallback to local data on error
      });
  }, [user]);

  const labels = allHoldings.map((stock) => stock.name || "N/A");

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price || 0),
        backgroundColor: "rgba(58, 112, 249, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const qty = stock.qty || 0;
              const avg = stock.avg || 0;
              const price = stock.price || 0;
              const currValue = price * qty;
              const isProfit = currValue - avg * qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{qty}</td>
                  <td>{avg.toFixed(2)}</td>
                  <td>{price.toFixed(2)}</td>
                  <td>{currValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {(currValue - avg * qty).toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
