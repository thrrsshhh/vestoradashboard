import axios from "axios";
import React, { useEffect, useState } from "react";

import { VerticalGraph } from "./VerticalGraph";
import { useAuth } from "../hooks/useAuth";
import { positions as localPositions } from "../data/data.js"; // adjust path

const Positions = () => {
  const [allPositions, SetAllPositions] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get("https://vestorabackendd.onrender.com/positions/index", {
        headers: {
          Authorization: user,
        },
      })
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          SetAllPositions(res.data);
        } else {
          SetAllPositions(localPositions); // fallback if empty
        }
      })
      .catch(() => {
        SetAllPositions(localPositions); // fallback if API fails
      });
  }, [user]);

  const labels = allPositions.map((stock) => stock.name || "N/A");

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allPositions.map((stock) => stock.price || 0),
        backgroundColor: "rgba(23, 69, 175, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock, index) => {
              const qty = stock.qty || 0;
              const avg = stock.avg || 0;
              const price = stock.price || 0;
              const currValue = price * qty;
              const isProfit = currValue - avg * qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.product || "N/A"}</td>
                  <td>{stock.name || "N/A"}</td>
                  <td>{qty}</td>
                  <td>{avg.toFixed(2)}</td>
                  <td>{price.toFixed(2)}</td>
                  <td className={profClass}>
                    {(currValue - avg * qty).toFixed(2)}
                  </td>
                  <td className={dayClass}>{stock.day ?? "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <VerticalGraph data={data} />
      </div>
    </>
  );
};

export default Positions;
