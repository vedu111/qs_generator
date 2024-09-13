import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { Loader2 } from "lucide-react";

export default function flush() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      setUser(null);
      navigate("/login");
    } else {
      setUser(user);
    }
  });
  if (
    user?.email !== "1032220215@tcetmumbai.in" &&
    user?.email !== "loukik.salvi@tcetmumbai.in"
  ) {
    navigate("/");
  }
  const flushDB = async () => {
    setLoading(true);
    // alert("Are you sure you want to flush the database?");
    // if (!window.confirm("Are you sure you want to flush the database?")) {
    //   setLoading(false);
    //   return;
    // }
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}flush`, {
      method: "DELETE",
    });
    if (response.ok) {
      alert("Database Flushed Successfully");
    } else {
      alert("Error Flushing Database");
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col gap-10 justify-center items-center my-20 mx-2">
      <h1 className="font-bold text-4xl leading-[3rem] tracking-[-0.06rem] md:leading-[3.75rem] 2xl:leading-[4.5rem] 2xl:text-6xl md:text-5xl text-white text-center">
        <span className="text-blue-500">Admin -</span> Flush Database
      </h1>
      <button
        disabled={loading}
        onClick={flushDB}
        className="text-xl flex gap-2 items-center px-[21px] py-[14px] rounded-2xl bg-blue-500 text-white hover:bg-white hover:text-black"
      >
        <span>Flush DB</span>
        {loading ? (
          <Loader2 className="w-6 h-6 text-white animate-spin" />
        ) : (
          <AiFillDelete width={20} height={20} />
        )}
      </button>
    </div>
  );
}
