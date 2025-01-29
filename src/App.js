import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Loader from "./components/Loader/Loader.js";
import Home from "./components/Home/Home.js";
import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const fetchDataFromLocalStorage = useCallback(() => {
    const myData = localStorage.getItem("userData");
    const result = JSON.parse(myData);
    if (myData !== null) {
      setLoading(false);
      setUserData(result);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetchDataFromLocalStorage();
  }, [fetchDataFromLocalStorage]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Home userData={userData} />
    </div>
  );
}

export default App;
