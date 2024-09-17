import { useEffect, useState } from "react";
import "./ShowExistingRevenues.css";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Constants from "../store/Constants";

export default () => {
  const [allRevenues, setAllRevenues] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({} as any);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilterCriteria({
      ...filterCriteria,
      [name]: value,
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/revenue")
      .then((allRevenuesResponse) => {
        setAllRevenues(
          allRevenuesResponse.data.map((record: any) => ({
            ...record,
            id: record.revenueId,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching revenues: ", error);
      });
  }, []);

  const criteriaContains = (cval: string, tval: string) => {
    return !cval || tval?.toString().toLowerCase().includes(cval.toString().toLowerCase());
  };

  const criteriaInRange = (cvalStart: number, cvalEnd: number, tval: number) => {
    return (!cvalStart || tval >= cvalStart) && (!cvalEnd || tval <= cvalEnd);
  };

  const clearFilterCriteria = () => {
    setFilterCriteria({
      revenueId: "",
      courseName: "",
      category: "",
      enquiriesCountStart: "",
      enquiriesCountEnd: "",
      convertedStart: "",
      convertedEnd: "",
      revenueGeneratedStart: "",
      revenueGeneratedEnd: "",
    });
  };

  const filterRevenueByCriteria = (revenuesList: any) => {
    return revenuesList.filter(
      (rev: any) =>
        criteriaContains(filterCriteria.revenueId, rev.revenueId) &&
        criteriaContains(filterCriteria.courseName, rev.courseName) &&
        criteriaContains(filterCriteria.category, rev.category) &&
        criteriaInRange(filterCriteria.enquiriesCountStart, filterCriteria.enquiriesCountEnd, rev.enquiriesCount) &&
        criteriaInRange(filterCriteria.convertedStart, filterCriteria.convertedEnd, rev.converted) &&
        criteriaInRange(filterCriteria.revenueGeneratedStart, filterCriteria.revenueGeneratedEnd, rev.revenueGenerated)
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <div id="revenueGridFilterContainer" style={{ padding: 30, display: "flex", flexDirection: "column" }}>
        <span>Revenue Id</span>
        <input type="number" value={filterCriteria.revenueId || ""} name="revenueId" onChange={handleInputChange} />
        <hr />
        <span>Course Name</span>
        <input type="text" value={filterCriteria.courseName || ""} name="courseName" onChange={handleInputChange} />
        <hr />
        <span>Enquiries Count Range</span>
        <span>
          <input
            type="number"
            value={filterCriteria.enquiriesCountStart || ""}
            name="enquiriesCountStart"
            onChange={handleInputChange}
          />{" "}
          to{" "}
          <input
            type="number"
            value={filterCriteria.enquiriesCountEnd || ""}
            name="enquiriesCountEnd"
            onChange={handleInputChange}
          />
        </span>
        <hr />
        <span>Converted Range</span>
        <span>
          <input
            type="number"
            value={filterCriteria.convertedStart || ""}
            name="convertedStart"
            onChange={handleInputChange}
          />{" "}
          to{" "}
          <input
            type="number"
            value={filterCriteria.convertedEnd || ""}
            name="convertedEnd"
            onChange={handleInputChange}
          />
        </span>
        <hr />
        <span>Category</span>
        <input type="text" value={filterCriteria.category || ""} name="category" onChange={handleInputChange} />
        <hr />
        <span>Revenue Generated Range</span>
        <span>
          <input
            type="number"
            value={filterCriteria.revenueGeneratedStart || ""}
            name="revenueGeneratedStart"
            onChange={handleInputChange}
          />{" "}
          to{" "}
          <input
            type="number"
            value={filterCriteria.revenueGeneratedEnd || ""}
            name="revenueGeneratedEnd"
            onChange={handleInputChange}
          />
        </span>
        <hr />
        <button style={{ height: 30 }} onClick={clearFilterCriteria}>
          Reset Filters
        </button>
      </div>
      <div id="revenueGridContainer" style={{ flexGrow: 1 }}>
        <DataGrid
          columns={Constants.REVENUE_COLUMNS}
          rows={filterRevenueByCriteria(allRevenues)}
          autoHeight
          pageSizeOptions={[10, 20, 50, 100]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        />
      </div>
    </div>
  );
};
