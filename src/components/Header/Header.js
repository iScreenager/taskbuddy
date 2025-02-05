import "./Header.css";
import logo_home from "../../assets/logo_home.png";
import list_icon from "../../assets/list_icon.png";
import board_icon from "../../assets/board_icon.png";
import logout_icon from "../../assets/logout_icon.png";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import Loader from "../Loader/Loader";
import { useIsMobile } from "../../hooks/useIsMobile";

const Header = (props) => {
  const [isActiveTab, setIsActiveTab] = useState("/list");
  const [isLoading, setIsLoading] = useState(false);
  const { isMobile } = useIsMobile();
  useEffect(() => {
    setIsActiveTab(window.location.pathname);
  }, [window.location.pathname]);

  const navigate = useNavigate();
  const { photoURL, displayName } = props.dataApi;

  const logoutUser = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await signOut(auth);
        navigate("/login");
      } catch (error) {
        console.error("Error while logging out:", error);
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };

  return (
    <>
      <div
        className="header_container"
        style={
          isMobile
            ? {
                background: "#FAEEFC",
                alignItems: "center",
                padding: "12px 10px",
                boxSizing: "border-box",
                boxShadow: "0px 0px 4px #00000040",
              }
            : {}
        }>
        <div className="logo_header">
          <div className="logo">
            {!isMobile && (
              <img src={logo_home} alt="logo" draggable="false"></img>
            )}
            <p style={isMobile ? { fontSize: "18px", fontWeight: "bold" } : {}}>
              TaskBuddy
            </p>
          </div>
          {!isMobile && (
            <div className="task_menu">
              <div
                className={`list menu ${isActiveTab === "/list" ? "activeTab" : ""}`}
                onClick={() => navigate("list")}>
                <img src={list_icon} alt="list" draggable="false"></img>
                <p>List</p>
              </div>
              <div
                className={`board menu ${isActiveTab === "/board" ? "activeTab" : ""}`}
                onClick={() => navigate("board")}>
                <img src={board_icon} alt="board" draggable="false"></img>
                <p>Board</p>
              </div>
            </div>
          )}
        </div>
        <div className="profile_header">
          <div className="profile">
            <img src={photoURL} draggable="false"></img>
            {!isMobile && <p>{displayName.split(" ")[0]}</p>}
          </div>
          {!isMobile && (
            <div className="logout_btn" onClick={logoutUser}>
              <img src={logout_icon} alt="logout" draggable="false"></img>
              <p>Logout</p>
            </div>
          )}
        </div>
      </div>
      {isLoading && (
        <div
          style={{
            zIndex: "99999",
          }}>
          <Loader />
        </div>
      )}
    </>
  );
};
export default Header;
