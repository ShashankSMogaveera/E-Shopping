import { Outlet, useNavigate } from "react-router";
import { FaSignInAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

function Sign() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);

  useEffect(()=>{
    navigate(isLogin? '/login' : '/register')
  },[isLogin]);
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsLogin(e.currentTarget.id === "signup" ? false : true);
  };

  return (
    <main className="min-h-screen w-screen flex flex-col justify-center items-center ">
      <div className="flex gap-2 mt-6">
        <div
          id="signin"
          role="button"
          tabIndex={0}
          onClick={handleClick}
          className={`flex gap-1 ${
            isLogin ? "bg-violet-700 text-white" : "bg-white text-purple-800"
          }  p-2 rounded-lg cursor-pointer`}
        >
          <FaSignInAlt className="mt-3 text-white" />
          <h1 className="text-3xl font-bold px-2">Sign In</h1>
        </div>
        <div
          id="signup"
          role="button"
          tabIndex={0}
          onClick={handleClick}
          className={`flex gap-1 ${
            isLogin ? "bg-white text-purple-800" : "bg-violet-700 text-white"
          }  p-2 rounded-lg cursor-pointer`}
        >
          <FaSignInAlt className="mt-3 text-white" />
          <h1 className="text-3xl font-bold px-2">Sign Up</h1>
        </div>
      </div>
      <Outlet />
    </main>
  );
}

export default Sign;
