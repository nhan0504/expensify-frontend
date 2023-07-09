import "./style.css";
import { useUser } from "@/context/UserContext";
import { api } from "@/utils/api";

export const Logout = () => {
  const { setUser } = useUser();

  const logOut = () => {
    api.logOut().then((res) => setUser(null));
  };

  return (
    <button
      className="log-out hover:bg-violet-400 hover:scale-110 transition ease-in-out delay-150"
      onClick={logOut}
    >
      Log out
    </button>
  );
};
