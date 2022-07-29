// import { Link } from "react-router-dom";
// import Loader from "../Loader/Loader";

function Dropdown(props: any) {
  const { buttonIcon, user, items } = props;
  console.log(user);
  const links: any = [];
  items.map((item: any) => {
    links.push({
      to: "/account/edit",
      className: "dropdown__item",
      icon: item.icon,
      label: item.label,
    });
  });

  return (
    <div className="navigation__dropdown">
      <div className="dropdown">
        {buttonIcon}
        <button className="dropdown__button">{user}</button>

        {/* <div className="dropdown__content">
          {links.map((link: any) => {
            const { label, icon, to, className } = link;
            return console.log(
              <Link key={label} to={to} className={className}>
                {icon}
                ss
              </Link>,
            );
          })}
        </div> */}
        {/* 



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
        </div> */}
      </div>
    </div>
  );
}
export default Dropdown;
