import React, {useContext} from "react";
import { GraphQLClient } from 'graphql-request';
import { GoogleLogin } from 'react-google-login';
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Context from '../../context'
import {ME_QUERY} from '../../graphql/queries'

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context)
  const onSuccess = async googleUser => {
    try {
      const idToken = googleUser.getAuthResponse().id_token
      // access to the GraphQL
      const client = new GraphQLClient('http://localhost:4000/graphql', {
        headers: { authorization: idToken }
      })
      const { me } = await client.request(ME_QUERY);
      dispatch({ type : "LOGIN_USER", payload: me });
      dispatch({ type : "IS_LOGGED_IN", payload: googleUser.isSignedIn() })
    } catch (err) {
      onFailure(err)
    }
  };

  const onFailure = err => {
    console.log("Error as", err)
  }

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h5"
        guttonNBottom
        noWrap
      >
        LifePlog - Picture Blog for recording daily life
      </Typography>
      <GoogleLogin
        clientId = "158729469950-91nbm3fr2u88js6rcksfujs4qvt04n8f.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn = {true}
        buttonText="Login with Google"
        theme="dark"
      />
    </div>
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
