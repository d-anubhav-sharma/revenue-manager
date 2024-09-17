import { useState } from "react";
import "./AddNewRevenue.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserMessage } from "../store/Slice";
import { currentDate } from "../services/DateService";
export default () => {
  const [courseName, setCourseName] = useState("");
  const [enquiriesCount, setEnquiriesCount] = useState(0);
  const [converted, setConverted] = useState(0);
  const [revenueGenerated, setRevenueGenerated] = useState(0);
  const [date, setDate] = useState(currentDate());

  const dispatch = useDispatch();

  const resetRevenueForm = () => {
    setCourseName("");
    setEnquiriesCount(0);
    setConverted(0);
    setRevenueGenerated(0);
    setDate(currentDate());
  };

  const submitRevenueForm = () => {
    axios
      .post("http://localhost:8080/revenue", {
        revenueId: 0,
        courseName: courseName,
        enquiriesCount: enquiriesCount,
        converted: converted,
        category: "",
        revenueGenerated: revenueGenerated,
        date: date,
      })
      .then((response) =>
        dispatch(
          setUserMessage({ level: "success", text: `revenue added with id: ${response.data.revenueId}`, visible: true })
        )
      );
  };

  return (
    <div id="addnewRevenueForm">
      <table>
        <tr>
          <td>Course Name:</td>
          <td>
            <input type="text" value={courseName} onChange={(event) => setCourseName(event.target.value)} />
          </td>
        </tr>
        <tr>
          <td>Enquiries Count:</td>
          <td>
            <input
              type="number"
              value={enquiriesCount}
              onChange={(event) => setEnquiriesCount(parseInt(event.target.value))}
            />
          </td>
        </tr>
        <tr>
          <td>Converted:</td>
          <td>
            <input type="number" value={converted} onChange={(event) => setConverted(parseInt(event.target.value))} />
          </td>
        </tr>
        <tr>
          <td>Revenue Generated:</td>
          <td>
            <input
              type="number"
              value={revenueGenerated}
              onChange={(event) => setRevenueGenerated(parseInt(event.target.value))}
            />
          </td>
        </tr>
        <tr>
          <td>Date:</td>
          <td>
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          </td>
        </tr>
        <tr>
          <td>
            <input className="actionButtons reset" type="reset" onClick={() => resetRevenueForm()} />
          </td>
          <td>
            <input className="actionButtons submit" type="submit" onClick={() => submitRevenueForm()} />
          </td>
        </tr>
      </table>
    </div>
  );
};
