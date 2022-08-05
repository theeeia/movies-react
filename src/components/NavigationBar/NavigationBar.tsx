import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

// Icons;
import { ReactComponent as UserIcon } from "../../assets/images/user.svg";
import { ReactComponent as MiruLogo } from "../../assets/images/logo.svg";

// Components
import Dropdown from "../Dropdown/Dropdown";

// Context
import { AuthContext } from "../../context/AuthContext";

// Utilities
import handleLogoutUser from "../../utils/handleLogoutUser";

// Statics
import { NAVIGATION_DROPDOWN_ITEMS } from "../../statics/dropdownItems";

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

  const handleChange = (value: string) => {
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
            dropdownBorderClass="dropdown__button--border"
            modifierClass=" dropdown--lg-wide "
            defaultValue={user}
            isButtonStatic={false}
            icon={<UserIcon />}
            handleChange={handleChange}
            dropdownItems={NAVIGATION_DROPDOWN_ITEMS}
          />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
