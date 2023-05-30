import React from "react";

import { NextPage } from "next";

import Layout from "components/layout";
import ProfilePage from "components/pages/profile/profilePage";

const Login: NextPage = () => {
  return (
    <Layout pageTitle='Profile - ZUVVII GAMING' type='black'>
        <ProfilePage />
    </Layout>
  )
};

export default Login;
