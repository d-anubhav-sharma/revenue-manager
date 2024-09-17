export default {
  ADD_NEW_REVENUE: "addNewRevenue",
  LOAD_REVENUE_FROM_EXCEL: "loadRevenuesFromExcel",
  SHOW_EXISTING_REVENUES: "showExistingRevenues",
  REVENUE_COLUMNS: [
    { field: "revenueId", headerName: "Id" },
    { field: "courseName", headerName: "Course" },
    { field: "enquiriesCount", headerName: "Enquiries" },
    { field: "converted", headerName: "Converted" },
    { field: "category", headerName: "Category" },
    { field: "revenueGenerated", headerName: "Revenue" },
    { field: "date", headerName: "Date" },
    { field: "createdTime", headerName: "Created At" },
  ],
};
