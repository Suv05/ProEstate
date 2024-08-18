import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function Protected() {
  const { currUser } = useSelector((state) => state.user);
  return currUser?<Outlet/>:<Navigate to="/signin"/>
}

export default Protected;
