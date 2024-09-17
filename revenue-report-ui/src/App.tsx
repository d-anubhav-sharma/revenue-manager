import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { setActiveScreen } from "./store/Slice";
import Container from "./container/Container";
import Constants from "./store/Constants";
import UserMessageBox from "./user-message/UserMessageBox";
function App() {
  const dispatch = useDispatch();
  const { activeScreen } = useSelector((state: any) => state.revenue);
  return (
    <div>
      <header id="revenueManagerHeader">
        <span style={{ fontSize: 30, marginRight: 30 }}>Revenue Manager</span>
        <div id="navigationItems">
          <span
            className={"navItem" + (activeScreen === Constants.ADD_NEW_REVENUE ? " selected" : "")}
            onClick={() => dispatch(setActiveScreen(Constants.ADD_NEW_REVENUE))}
          >
            Add new revenue
          </span>
          <span
            className={"navItem" + (activeScreen === Constants.LOAD_REVENUE_FROM_EXCEL ? " selected" : "")}
            onClick={() => dispatch(setActiveScreen(Constants.LOAD_REVENUE_FROM_EXCEL))}
          >
            Load Revenues from Excel
          </span>
          <span
            className={"navItem" + (activeScreen === "showExistingRevenues" ? " selected" : "")}
            onClick={() => dispatch(setActiveScreen("showExistingRevenues"))}
          >
            Show Existing Revenues
          </span>
          <span
            className={"navItem" + (activeScreen === "generateRevenueReports" ? " selected" : "")}
            onClick={() => dispatch(setActiveScreen("generateRevenueReports"))}
          >
            Generate Revenue Reports
          </span>
        </div>
      </header>
      <Container />
      <footer>
        <UserMessageBox />
      </footer>
    </div>
  );
}

export default App;
