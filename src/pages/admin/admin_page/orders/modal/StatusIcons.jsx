import DoneIcon from "@mui/icons-material/Done";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ErrorIcon from "@mui/icons-material/Error";

//STATUS ICON
const StatusIcons = ({ status }) => {
  switch (status) {
    case "Successful":
      return (
        <>
          <DoneIcon fontSize="small" sx={{ verticalAlign: "middle", marginRight: 1 }} />
          <span>Successful</span>
        </>
      );

    case "Pending":
      return (
        <>
          <AutorenewIcon fontSize="small" sx={{ verticalAlign: "middle", marginRight: 1 }} />
          <span>Pending</span>
        </>
      );

    case "Failed":
      return (
        <>
          <ErrorIcon fontSize="small" sx={{ verticalAlign: "middle", marginRight: 1 }} />
          <span>Failed</span>
        </>
      );

    default:
      return <></>;
  }
};

export default StatusIcons;
