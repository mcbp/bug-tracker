import React from "react";
import { Route, Redirect } from "react-router-dom"
import { motion } from 'framer-motion'
import { connect } from "react-redux"
import PropTypes from "prop-types"

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <motion.div exit={{}}>
          <Redirect to="/login" />
        </motion.div>
      )
    }
  />
);

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);
