// Components
import Footer from "../components/Footer/Footer";
import NavigationBar from "../components/NavigationBar/NavigationBar";

// Pages
import AuthenticatedApp from "../pages/AuthenticatedApp";

const AuthenticatedAppLayout = () => {
  return (
    <>
      <NavigationBar />
      <div className="container minimal-page-height">
        <AuthenticatedApp />
      </div>

      <Footer />
    </>
  );
};

export default AuthenticatedAppLayout;
