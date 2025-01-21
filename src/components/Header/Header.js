import "./Header.css";
import logo_home from "../../assets/logo_home.png";
import list_icon from "../../assets/list_icon.png";
import board_icon from "../../assets/board_icon.png";
import logout_icon from "../../assets/logout_icon.png";

const Header = (props) => {
  const { photoURL, displayName } = props.dataApi;
  return (
    <div className="header_container">
      <div className="logo_header">
        <div className="logo">
          <img src={logo_home}></img>
          <p>TaskBuddy</p>
        </div>
        <div className="task_menu">
          <div class="list menu">
            <img src={list_icon}></img>
            <p>List</p>
          </div>
          <div className="board menu">
            <img src={board_icon}></img>
            <p>Board</p>
          </div>
        </div>
      </div>
      <div className="profile_header">
        <div className="profile">
          <img src={photoURL}></img>
          <p>{displayName.split(" ")[0]}</p>
        </div>
        <div className="logout_btn">
          <img src={logout_icon}></img>
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};
export default Header;
