// Components
import NavigationBar from "../components/NavigationBar/NavigationBar";

// Pages
import AuthenticatedApp from "../pages/AuthenticatedApp";

const AuthenticatedAppLayout = () => {
  return (
    <>
      <NavigationBar />
      <AuthenticatedApp />
    </>
  );
};

export default AuthenticatedAppLayout;
