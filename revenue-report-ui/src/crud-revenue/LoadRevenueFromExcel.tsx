import axios from "axios";
import "./LoadRevenueFromExcel.css";
import { useEffect, useState } from "react";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import { useDispatch } from "react-redux";
import { setUserMessage } from "../store/Slice";
import { locateMonthApprox, zeroPad } from "../services/DateService";

export default () => {
  const [revenueData, setRevenueData] = useState({} as any);
  const [searchText, setSearchText] = useState("");
  const [selectedSheetNames, setSelectedSheetNames] = useState([""]);
  const [consolidatedRecordList, setConsolidatedRecordList] = useState([] as any);
  const dispatch = useDispatch();
  const handleFileUploaded = (files: FileList | null) => {
    if (!files) return;

    const file = files[0];
    const formData = new FormData();

    formData.append("file", file);

    axios
      .post("http://localhost:8080/revenue/document/load", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setRevenueData(response.data);
        setSelectedSheetNames(Object.keys(response.data));
      })
      .catch((error) => {
        console.error("Error uploading file", error);
      });
  };

  const consolidateSelectedSheets = () => {
    if (!selectedSheetNames.length) {
      setConsolidatedRecordList([]);
      return [];
    }
    let revenueDataList = selectedSheetNames
      .map((name) => revenueData[name])
      .flat()
      .filter(
        (record) =>
          !record?.courseName?.toLowerCase().includes("date") &&
          !record?.courseName?.toLowerCase().includes("total") &&
          !record?.courseName?.toLowerCase().includes("course")
      );
    let allCourseNames = [...new Set(revenueDataList.map((record) => record?.courseName))].filter((name) => name);
    let consolidatedRecords = [];
    for (let courseName of allCourseNames) {
      let record = { courseName: courseName, enquiriesCount: 0, converted: 0, revenueGenerated: 0 };
      for (let singleRevenueRecord of revenueDataList) {
        if (singleRevenueRecord?.courseName == courseName) {
          record.enquiriesCount += singleRevenueRecord.enquiriesCount;
          record.converted += singleRevenueRecord.converted;
          record.revenueGenerated += singleRevenueRecord.revenueGenerated;
        }
      }
      consolidatedRecords.push(record);
    }
    setConsolidatedRecordList(consolidatedRecords);
  };
  const getTotalEnquiriesCount = () => {
    return consolidatedRecordList
      .map((record: any) => record.enquiriesCount)
      .reduce((a: number, b: number) => a + b, 0);
  };

  const getTotalConverted = () => {
    return consolidatedRecordList.map((record: any) => record.converted).reduce((a: number, b: number) => a + b, 0);
  };
  const getTotalRevenueGenerated = () => {
    return consolidatedRecordList
      .map((record: any) => record.revenueGenerated)
      .reduce((a: number, b: number) => a + b, 0);
  };
  const getConsolidatedRecordsList = () => {
    return consolidatedRecordList.map((record: any) => (
      <tr key={record.courseName}>
        <td>{record.courseName}</td>
        <td>{record.enquiriesCount}</td>
        <td>{record.converted}</td>
        <td>{record.revenueGenerated}</td>
      </tr>
    ));
  };
  const getDateFromSheetName = (sheetName: any) => {
    if (!sheetName) return "";
    const splitName = sheetName.trim().split(" ");
    if (splitName.length < 2) return "";
    let day = splitName[0].trim().toLowerCase().replace("st", "").replace("nd", "").replace("th", "").replace("rd", "");
    let month = locateMonthApprox(splitName[1].trim().toLowerCase());
    let year = (splitName[2] || "").trim().toLowerCase() || new Date().getFullYear();
    return zeroPad(year.toString(), 4) + "-" + zeroPad(month.toString(), 2) + "-" + zeroPad(day.toString(), 2);
  };
  const compareSheetNames = (sheet1: string, sheet2: string) => {
    const date1 = getDateFromSheetName(sheet1);
    const date2 = getDateFromSheetName(sheet2);
    return date1.localeCompare(date2);
  };
  const uploadSelectedRevenueRecordsToDB = () => {
    if (!selectedSheetNames.length) {
      return [];
    }
    let revenueDataList = selectedSheetNames
      .map((name) =>
        revenueData[name].map((record: any) => {
          record.date = getDateFromSheetName(name);
          console.log(record.date);
          return record;
        })
      )
      .flat()
      .filter(
        (record) =>
          !record?.courseName?.toLowerCase().includes("date") &&
          !record?.courseName?.toLowerCase().includes("total") &&
          !record?.courseName?.toLowerCase().includes("course")
      );
    axios
      .post("http://localhost:8080/revenue/bulk", revenueDataList)
      .then((response) =>
        dispatch(setUserMessage({ level: "success", text: response.data.length + " records inserted", visible: true }))
      );
  };

  useEffect(() => {
    consolidateSelectedSheets();
  }, [selectedSheetNames]);
  return (
    <div style={{ display: "flex" }}>
      <div id="loadRevenueFromExcelContainer">
        <input
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={(event) => handleFileUploaded(event?.target?.files)}
        />
        <div style={{ marginTop: 10 }}>
          <div>
            <input type="text" value={searchText} onChange={(event) => setSearchText(event.target.value)} />
            <span style={{ marginLeft: 5, cursor: "pointer" }} className="fa fa-search"></span>
            <span
              style={{ marginLeft: 5, cursor: "pointer" }}
              className="fa fa-check"
              onClick={() =>
                setSelectedSheetNames(
                  Object.keys(revenueData).filter((sheetName) =>
                    sheetName.toLowerCase().includes(searchText.toLowerCase())
                  )
                )
              }
            ></span>
            <span
              style={{ marginLeft: 5, cursor: "pointer" }}
              className="fa fa-close"
              onClick={() => setSelectedSheetNames([])}
            ></span>
            <span
              style={{ marginLeft: 5, cursor: "pointer" }}
              className="fa fa-save"
              onClick={() => uploadSelectedRevenueRecordsToDB()}
            ></span>
          </div>
          {Object.keys(revenueData)
            .filter((sheetName) => sheetName.toLowerCase().includes(searchText.toLowerCase()))
            .sort((sheetName1, sheetName2) => compareSheetNames(sheetName1, sheetName2))
            .map((sheetName) => (
              <div key={sheetName}>
                <input
                  type="checkbox"
                  checked={selectedSheetNames.includes(sheetName)}
                  onChange={(event) => {
                    if (event.target.value == "on") {
                      setSelectedSheetNames(selectedSheetNames.filter((name) => name != sheetName));
                      event.target.value = "off";
                    } else {
                      setSelectedSheetNames([...selectedSheetNames, sheetName]);
                      event.target.value = "on";
                    }
                  }}
                />
                <span>{sheetName}</span>
              </div>
            ))}
        </div>
      </div>
      <div style={{ marginTop: 100, marginLeft: 300 }}>
        <table>
          <tr className="header-row">
            <td>Courses</td>
            <td>Enquiries Count</td>
            <td>Converted</td>
            <td>Revenue Generated</td>
          </tr>
          {getConsolidatedRecordsList()}
          <tr className="footer-row">
            <td>Total</td>
            <td>{getTotalEnquiriesCount()}</td>
            <td>{getTotalConverted()}</td>
            <td>{getTotalRevenueGenerated()}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};
