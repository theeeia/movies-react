import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

// Icons;
import { ReactComponent as UserIcon } from "../../assets/images/user.svg";
import { ReactComponent as MiruLogo } from "../../assets/images/logo.svg";
import { ReactComponent as DropdownArrow } from "../../assets/images/dropdown-arrow.svg";

// Components
import Dropdown from "../Dropdown/Dropdown";

// Context
import { AuthContext } from "../../context/AuthContext";

// Utilities
import handleLogoutUser from "../../utils/handleLogoutUser";

import { NAVIGATION_DROPDOWN_ITEMS } from "./statics";

const NavigationBar = () => {
  const { user } = useContext(AuthContext);

  // Loader for the logout button while user is being logged out

  const handleLogout = async () => {
    await handleLogoutUser();
  };

  /*================
    DROPDOWN ITEMS

   List of items and their props to show on the navigation bar dropdown
  ================*/

  const navigate = useNavigate();

  const handleChange = (item: any) => {
    if (item.value === "logout") {
      handleLogout();
    } else {
      navigate(item.value);
    }
  };

  return (
    <div className="navigation">
      <div className="container navigation__content">
        <div className="navigation__logo">
          <MiruLogo />
        </div>
        <div className="navigation__links">
          <Link to={"/movies/now-playing"} className="navigation__link">
            Now Playing
          </Link>
          <Link to={"/movies/upcoming"} className="navigation__link">
            Upcoming
          </Link>
          <Link to={"/movies/top-rated"} className="navigation__link">
            Top Rated
          </Link>
          <Link to={"/movies/favorites"} className="navigation__link">
            Favorites
          </Link>
          <Link to={"/"} className="navigation__link">
            Statistics
          </Link>
          <Link to={"/"} className="navigation__link">
            Search
          </Link>
        </div>

        <div className="navigation__dropdown">
          <Dropdown
            title={user}
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
