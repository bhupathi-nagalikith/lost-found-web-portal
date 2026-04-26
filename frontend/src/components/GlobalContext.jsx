import { createContext, useEffect, useState } from "react";
import API from "../api/api";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  const [route, setRoute] = useState(storedToken ? "dashboard" : "home");
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(storedToken));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    regdNo: "",
    course: "",
    section: "",
    password: "",
    confirmPassword: "",
  });
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [reports, setReports] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabs, settabs] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [lost, setLost] = useState({ itemname: "", des: "", image: "" });
  const [found, setFound] = useState({ itemname: "", des: "", image: "" });
  const [editing, setEditing] = useState(null);
  const [matchCandidate, setMatchCandidate] = useState(null);

  const fetchReports = async () => {
    if (!localStorage.getItem("token")) {
      setItems([]);
      setReports([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await API.get("/reports");
      setItems(res.data);
      setReports(res.data);
    } catch (fetchError) {
      setError(fetchError);
      console.error("Error fetching reports:", fetchError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const value = {
    editing,
    error,
    fetchReports,
    filter,
    formData,
    found,
    isLoggedIn,
    items,
    loading,
    lost,
    matchCandidate,
    reports,
    route,
    searchQuery,
    setEditing,
    setError,
    setFilter,
    setFormData,
    setFound,
    setIsLoggedIn,
    setItems,
    setLost,
    setMatchCandidate,
    setReports,
    setRoute,
    setSearchQuery,
    setUser,
    settabs,
    tabs,
    user,
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};
