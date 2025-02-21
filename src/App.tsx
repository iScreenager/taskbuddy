import { useCallback, useContext, useEffect, useState } from "react";
import Loader from "./components/Loader/Loader";
import { useNavigate } from "react-router";
import { TaskContext } from "./context/TaskContext";
import Home from "./components/Home/Home";
import { UserData } from "./interface";

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const { setUserData } = useContext(TaskContext);

  const fetchDataFromLocalStorage = useCallback(() => {
    const myData: string = localStorage.getItem("userData") ?? "";

    if (myData !== "") {
      const result: UserData = JSON.parse(myData);
      setLoading(false);
      setUserData(result);
    } else {
      navigate("/login");
    }
  }, [navigate, setUserData]);

  useEffect(() => {
    fetchDataFromLocalStorage();
  }, [fetchDataFromLocalStorage]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
