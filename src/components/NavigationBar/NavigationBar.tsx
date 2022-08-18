import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

// Icons
import { ReactComponent as UserIcon } from "../../assets/images/user.svg";
import { ReactComponent as MiruLogo } from "../../assets/images/logo.svg";
import { ReactComponent as DropdownArrow } from "../../assets/images/dropdown-arrow.svg";

// Components
import Dropdown from "../Dropdown/Dropdown";

// Context
import { AuthContext } from "../../context/AuthContext";

// Utilities
import handleLogoutUser from "../../utils/handleLogoutUser";

// Statics
import { NAVIGATION_DROPDOWN_ITEMS } from "./statics";

// Interfaces
import { DropdownItemProps } from "../Dropdown/interfaces";

const NavigationBar = () => {
  const { user } = useContext(AuthContext);

  // Loader for the logout button while user is being logged out
  const [loadingLogout, setLoadingLogout] = useState(false);
  const handleLogout = async () => {
    setLoadingLogout(true);
    try {
      await handleLogoutUser();
    } finally {
      setLoadingLogout(false);
    }
  };

  /*================
    DROPDOWN ITEMS

   List of items and their props to show on the navigation bar dropdown
  ================*/

  const navigate = useNavigate();

  const handleChange = (navigationItem: DropdownItemProps) => {
    const value = navigationItem.value as string;
    if (value === "logout") {
      handleLogout();
    } else {
      navigate(value);
    }
  };

  return (
    <div className="navigation">
      <div className="container navigation__content">
        <div className="navigation__logo">
          <MiruLogo />
        </div>
        <div className="navigation__links">
          <NavLink
            to={"/movies/now-playing"}
            className={({ isActive }) =>
              isActive ? "navigation__link" : "navigation__link navigation__link--unselected"
            }
          >
            Now Playing
          </NavLink>
          <NavLink
            to={"/movies/upcoming"}
            className={({ isActive }) =>
              isActive ? "navigation__link" : "navigation__link navigation__link--unselected"
            }
          >
            Upcoming
          </NavLink>
          <NavLink
            to={"/movies/top-rated"}
            className={({ isActive }) =>
              isActive ? "navigation__link" : "navigation__link navigation__link--unselected"
            }
          >
            Top Rated
          </NavLink>
          <NavLink
            to={"/movies/favorites"}
            className={({ isActive }) =>
              isActive ? "navigation__link" : "navigation__link navigation__link--unselected"
            }
          >
            Favorites
          </NavLink>
          <NavLink
            to={"/movies/statistics"}
            className={({ isActive }) =>
              isActive ? "navigation__link" : "navigation__link navigation__link--unselected"
            }
          >
            Statistics
          </NavLink>
          <NavLink
            to={"/movies/search"}
            className={({ isActive }) =>
              isActive ? "navigation__link" : "navigation__link navigation__link--unselected"
            }
          >
            Search
          </NavLink>
        </div>

        <div className="navigation__dropdown">
          <Dropdown
            title={user}
            isLoading={loadingLogout}
            icon={<UserIcon />}
            downIcon={<DropdownArrow />}
            isDisplayedTextStatic={true}
            items={NAVIGATION_DROPDOWN_ITEMS}
            handleDropdownItem={handleChange}
            modifierClass={"dropdown--border dropdown--lg-wide dropdown--line"}
          />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
