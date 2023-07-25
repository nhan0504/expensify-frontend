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
      className="log-out text-sm sm:text-sm md:text-base lg:text-lg xl:text-lg py-1 px-2 sm:py-2 sm:px-4 rounded-full font-bold text-gray-700 bg-purple-200 hover:bg-violet-400 hover:scale-110 transition-all ease-in-out delay-150"
      onClick={logOut}
    >
      Log out
    </button>
  );
};
