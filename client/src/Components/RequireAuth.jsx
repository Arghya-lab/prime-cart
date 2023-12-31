import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types"

function RequireAuth({ children }) {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();

  if (!auth.token) {
    // Redirect them to the /login page, but save the current location they were trying to go to when they were redirected. This allows us to send them along to that page after they login, which is a nicer user experience than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function RequireSellerAuth({ children }) {
  const auth = useSelector((state) => state.auth);

  if (!auth.sellerToken) {
    // Redirect them to the /sellerAuth page, but save the current location they were trying to go to when they were redirected. This allows us to send them along to that page after they sellerAuth, which is a nicer user experience than dropping them off on the home page.
    return <Navigate to="/sellerAuth" />;
  }
  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired
}

RequireSellerAuth.propTypes = {
  children: PropTypes.node.isRequired
}


export { RequireAuth, RequireSellerAuth };
