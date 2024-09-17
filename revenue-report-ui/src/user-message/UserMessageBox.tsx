import { useDispatch, useSelector } from "react-redux";
import { setUserMessage } from "../store/Slice";
import "./UserMessageBox.css";
export default () => {
  const { userMessage } = useSelector((state: any) => state.revenue);
  const dispatch = useDispatch();

  const getLevelColor = (level: string) => {
    switch (level) {
      case "info":
        return "grey";
      case "success":
        return "green";
      case "error":
        return "orange";
      case "progress":
        return "yellow";
    }
  };

  if (!userMessage.visible) return <></>;
  return (
    <div id="userMessageBox" style={{ backgroundColor: getLevelColor(userMessage.level) }}>
      <p>
        <i id="dismissButton" onClick={() => dispatch(setUserMessage({ level: "", text: "", visible: false }))}>
          X
        </i>
        {userMessage.text}
      </p>
    </div>
  );
};
