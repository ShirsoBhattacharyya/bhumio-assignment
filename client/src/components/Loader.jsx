import JiraIcon from "../assets/atlassian_jira-icon.svg";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <img src={JiraIcon} alt="Jira Loading" className="heartbeat-animation" />
    </div>
  );
};

export default Loader;
