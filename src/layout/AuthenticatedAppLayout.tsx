// Components
import Footer from "../components/Footer/Footer";
import NavigationBar from "../components/NavigationBar/NavigationBar";

// Pages
import AuthenticatedApp from "../pages/AuthenticatedApp";

const AuthenticatedAppLayout = () => {
  return (
    <>
      <NavigationBar />
      <AuthenticatedApp />
      <Footer />
    </>
  );
};

export default AuthenticatedAppLayout;
