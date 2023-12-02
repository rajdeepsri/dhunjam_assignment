import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import BarGraph from "../components/BarGraph";

const Dashboard = () => {
  const { token, userId } = useAuth();
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://stg.dhunjam.in/account/admin/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        setData(response.data.data);
      } else {
        console.error("Error fetching data:", response.data.server_err_msg);
      }
    } catch (error) {
      console.error("Error during data fetch:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, userId]);

  if (!data) {
    return <p>Loading...</p>;
  }

  const { name, location, charge_customers, amount } = data;

  const handleAmountInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = value.replace(/\D/g, "");

    if (name === "category_7" && updatedValue < 79) return;
    if (name === "category_8" && updatedValue < 59) return;
    if (name === "category_9" && updatedValue < 39) return;
    if (name === "category_10" && updatedValue < 19) return;

    if (updatedValue) {
      setData({
        ...data,
        amount: {
          ...data.amount,
          [name]: parseInt(updatedValue),
        },
      });
    }
  };

  const isDisabled = data.charge_customers === false;
  const saveBtnIsDisabled =
    data.amount.category_6 <= 99 ||
    data.amount.category_7 <= 79 ||
    data.amount.category_8 <= 59 ||
    data.amount.category_9 <= 29 ||
    data.amount.category_10 <= 19;

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.put(
        `https://stg.dhunjam.in/account/admin/${userId}`,
        {
          amount: {
            category_6: data.amount.category_6,
            category_7: data.amount.category_7,
            category_8: data.amount.category_8,
            category_9: data.amount.category_9,
            category_10: data.amount.category_10,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (resp.data.status === 200) {
        fetchData();
        alert("Data updated successfully");
      } else {
        console.error("Error updating data:", resp.data.server_err_msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const categoryValuesArray = [
    data.amount.category_6,
    data.amount.category_7,
    data.amount.category_8,
    data.amount.category_9,
    data.amount.category_10,
  ];

  const xDataArray = [
    "category 6",
    "category 7",
    "category 8",
    "category 9",
    "category 10",
  ];

  return (
    <div className="container">
      <h1>
        {name}, {location} on Dhun Jam
      </h1>
      <form className="dashboard_form" onSubmit={handleSave}>
        <div className="form_div">
          <p>Do you want to charge your customers for requesting songs?</p>
          <div className="radio_btns">
            <label htmlFor="radio_yes">Yes</label>
            <input
              type="radio"
              id="radio_yes"
              name="charge_customers"
              checked={charge_customers === true}
              onChange={() => setData({ ...data, charge_customers: true })}
            />
            <label htmlFor="radio_no">No</label>
            <input
              type="radio"
              id="radio_no"
              name="charge_customers"
              checked={charge_customers === false}
              onChange={() => setData({ ...data, charge_customers: false })}
            />
          </div>
        </div>
        <div className="form_div">
          <p>Custom song request amount-</p>
          <input
            type="text"
            className={`text_input ${isDisabled ? "disabled_text_input" : ""}`}
            disabled={isDisabled}
            value={amount.category_6}
            name="category_6"
            onChange={handleAmountInputChange}
          />
        </div>
        <div className="form_div">
          <p>Regular song request amounts, from high to low-</p>
          <div className="amounts_div">
            <input
              type="text"
              className={`small_input ${
                isDisabled ? "disabled_small_text_input" : ""
              }`}
              name="category_7"
              onChange={handleAmountInputChange}
              value={amount.category_7}
              disabled={isDisabled}
            />
            <input
              type="text"
              className={`small_input ${
                isDisabled ? "disabled_small_text_input" : ""
              }`}
              name="category_8"
              onChange={handleAmountInputChange}
              value={amount.category_8}
              disabled={isDisabled}
            />
            <input
              type="text"
              className={`small_input ${
                isDisabled ? "disabled_small_text_input" : ""
              }`}
              name="category_9"
              onChange={handleAmountInputChange}
              value={amount.category_9}
              disabled={isDisabled}
            />
            <input
              type="text"
              className={`small_input ${
                isDisabled ? "disabled_small_text_input" : ""
              }`}
              name="category_10"
              onChange={handleAmountInputChange}
              value={amount.category_10}
              disabled={isDisabled}
            />
          </div>
        </div>
        {!isDisabled && (
          <div style={{ maxWidth: "600px" }}>
            <BarGraph
              yData={categoryValuesArray}
              xData={xDataArray}
              yLabel="Category"
            />
          </div>
        )}

        <button
          className={`submit_btn ${
            isDisabled || saveBtnIsDisabled ? "disabled_btn" : ""
          }`}
          disabled={isDisabled || saveBtnIsDisabled}
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
