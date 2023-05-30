import React from "react";

import { NextPage } from "next";

import Layout from "components/layout";
import RegisterPage from "components/pages/auth/register";

const Register: NextPage = () => {
  return (
    <Layout pageTitle='REGISTER - ZUVVII GAMING' type='mini'>
      <RegisterPage />
    </Layout>
  )
};

export default Register;
