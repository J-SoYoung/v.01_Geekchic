import React from "react";
import Chevron_left from "../../assets/icons/chevron_left.svg";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userAtom";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  return (
    <div className="w-[600px] min-h-screen">
      <header className="p-8 text-left ">
        {location.pathname !== `/my/${user && user.uid}` && (
          <img
            src={Chevron_left}
            alt="이전 페이지로"
            className="w-10 h-10 cursor-pointer "
            onClick={() => navigate(-1)}
          />
        )}
        <h1
          className={`text-3xl font-bold text-center mb-5 mt-5  
          ${location.pathname === `/my/${user && user.uid}` && "pt-10"}`}
        >
          {title}
        </h1>
      </header>

      {/* Contents */}
      <main>{children}</main>
    </div>
  );
};
export default Layout;
