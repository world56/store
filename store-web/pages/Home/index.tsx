import React from 'react';
import { type NextPage } from 'next';
import Header from 'components/Header';
import Navigation from 'components/Navigation';

/**
 * @name Home 商城首页
 */
const Home: NextPage = (props) => {
  return (
    <>
      <Header />
      <Navigation />
    </>
  );
};

export default Home;
