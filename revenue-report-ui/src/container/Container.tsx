import { useSelector } from "react-redux";
import "./Container.css";
import Constants from "../store/Constants";
import AddNewRevenue from "../crud-revenue/AddNewRevenue";
import LoadRevenueFromExcel from "../crud-revenue/LoadRevenueFromExcel";
import ShowExistingRevenues from "../crud-revenue/ShowExistingRevenues";
export default () => {
  const { activeScreen } = useSelector((state: any) => state.revenue);
  const getActiveScreen = () => {
    switch (activeScreen) {
      case Constants.ADD_NEW_REVENUE:
        return <AddNewRevenue />;
      case Constants.LOAD_REVENUE_FROM_EXCEL:
        return <LoadRevenueFromExcel />;
      case Constants.SHOW_EXISTING_REVENUES:
        return <ShowExistingRevenues />;
      default:
        return <div>This screen is not available</div>;
    }
  };
  return getActiveScreen();
};
