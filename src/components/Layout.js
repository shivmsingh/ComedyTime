import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="container lg:max-w-7xl md:max-w-3xl mx-auto">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
