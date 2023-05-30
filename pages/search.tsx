import React from "react";

import { NextPage } from "next";

import Layout from "components/layout";
import SearchPage from "components/pages/search/searchPage";

const Search: NextPage = () => {
  return (
    <Layout pageTitle='LOGIN - ZUVVII GAMING' type='black'>
      <SearchPage />
    </Layout>
  )
};

export default Search;
