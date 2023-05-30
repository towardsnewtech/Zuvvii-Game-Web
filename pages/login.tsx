import React from "react";

import { NextPage } from "next";

import Layout from "components/layout";
import LoginPage from "components/pages/auth/login";

const Login: NextPage = () => {
  return (
    <Layout pageTitle='LOGIN - ZUVVII GAMING' type='mini'>
      <LoginPage />
    </Layout>
  )
};

export default Login;
