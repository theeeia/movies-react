import { Link } from "react-router-dom";
import { useContext, useState } from "react";

// Icons;
import { ReactComponent as UserIcon } from "../../assets/images/user.svg";
import { ReactComponent as SettingsIcon } from "../../assets/images/settings.svg";
import { ReactComponent as LogoutIcon } from "../../assets/images/logout.svg";
import { ReactComponent as MiruLogo } from "../../assets/images/logo.svg";

// Components
import Loader from "../Loader/Loader";

// Context
import { AuthContext } from "../../context/AuthContext";

// Utilities
import handleLogoutUser from "../../utils/handleLogoutUser";
//import Dropdown from "./Dropdown";

function NavigationBar() {
  const { user } = useContext(AuthContext);

  const [loadingLogout, setLoadingLogout] = useState(false);
  const handleLogout = async () => {
    setLoadingLogout(true);
    try {
      await handleLogoutUser();
    } finally {
      setLoadingLogout(false);
    }
  };

  // const dropdownItems = [
  //   { icon: SettingsIcon, label: "Settings" },
  //   { icon: LogoutIcon, label: "Logout" },
  //   {
  //     icon: LogoutIcon,
  //     label: loadingLogout ? (
  //       <Loader />
  //     ) : (
  //       <>
  //         <LogoutIcon /> Log out
  //       </>
  //     ),
  //     onClick: handleLogout,
  //   },
  // ];
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
          <div className="dropdown">
            <button className="dropdown__button">
              <>
                <UserIcon />
                {user}
              </>
            </button>
            <div className="dropdown__content">
              <Link to="/account/edit" className="dropdown__item">
                <SettingsIcon />
                Settings
              </Link>
              <Link to="/account/privileges" className="dropdown__item">
                <SettingsIcon />
                Privileges
              </Link>
              <button onClick={handleLogout} className="dropdown__item">
                {loadingLogout ? (
                  <Loader />
                ) : (
                  <>
                    <LogoutIcon /> Log out
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    /* <Dropdown buttonIcon={UserIcon} user={user} items={dropdownItems} /> */
  );
}

export default NavigationBar;
