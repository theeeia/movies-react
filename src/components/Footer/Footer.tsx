import { getYear } from "date-fns";

const Footer = () => {
  const date = getYear(Date.now());

  return (
    <div className="footer">
      <p> MIRU VIDEO STREAMING - © {date} All Rights Reserved </p>
    </div>
  );
};
export default Footer;
