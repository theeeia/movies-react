import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

// Icons;
import { ReactComponent as UserIcon } from "../../assets/images/user.svg";
import { ReactComponent as SettingsIcon } from "../../assets/images/settings.svg";
import { ReactComponent as LogoutIcon } from "../../assets/images/logout.svg";
import { ReactComponent as MiruLogo } from "../../assets/images/logo.svg";

// Components
import Loader from "../Loader/Loader";
import NavigationBarDropdown from "./NavigationBarDropdown";

// Context
import { AuthContext } from "../../context/AuthContext";

// Utilities
import handleLogoutUser from "../../utils/handleLogoutUser";

function NavigationBar() {
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
  const dropdownItems = [
    {
      label: (
        <>
          <SettingsIcon />
          Settings
        </>
      ),
      onClick: () => navigate("/account/edit"),
      className: "dropdown__item dropdown__item--line",
    },
    {
      label: (
        <>
          <LogoutIcon />
          Privileges
        </>
      ),
      onClick: () => navigate("/account/privileges"),
      className: "dropdown__item dropdown__item--line",
    },
    {
      label: loadingLogout ? (
        <Loader />
      ) : (
        <>
          <LogoutIcon />
          Log out
        </>
      ),
      onClick: handleLogout,
      className: "dropdown__item dropdown__item--line",
    },
  ];

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

        <NavigationBarDropdown
          user={
            <>
              <UserIcon />
              {user}
            </>
          }
          dropdownItems={dropdownItems}
        />
      </div>
    </div>
  );
}

export default NavigationBar;
