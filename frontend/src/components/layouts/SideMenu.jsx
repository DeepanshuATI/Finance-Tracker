import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../cards/CharAvatar';

const SideMenu = ({ activeMenu, onMenuClick }) => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleClick = (route) => {
        if(route === "logout"){
            handleLogout();
            return;
        }
        navigate(route);
        // Close sidebar on mobile after navigation
        if (onMenuClick) {
            onMenuClick();
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
        
        if (onMenuClick) {
            onMenuClick();
        }
    };

  return (
    <div className="w-full h-full bg-white p-5">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="ProfileImage"
            className="w-20 h-20 bg-slate-400 rounded-full object-cover"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className="text-gray-900 font-medium leading-6">
          {user?.fullName || ""}
        </h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] transition-all duration-200 ${
            activeMenu === item.label
              ? "text-white bg-blue-500 shadow-md"
              : "text-gray-700 hover:bg-gray-100"
          } py-3 px-6 rounded-lg mb-3 relative`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
          {item.badge && (
            <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;

