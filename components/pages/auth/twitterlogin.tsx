import React from "react";
// import TwitterLogin from "react-twitter-login";
import Icon from "shared/core/Icon";

const CONSUMER_KEY = "PyHxgJuyORZqhDiuKAne8LcxT"
const CONSUMER_SECRET = "RBqOgWJfflgk2GLGmKtHFnHituqvf3vROPfAqzOPpfKficIrI9"

const Twitter = () => {
  const authHandler = (err: any, data: any) => {
    console.log(err, data);
  };

  return (
    <>
    </>
    // <TwitterLogin
    //   authCallback={authHandler}
    //   consumerKey={CONSUMER_KEY}
    //   consumerSecret={CONSUMER_SECRET}
    //   //children={<Icon name='twitter' color='#55ACEE' bgColor="white" rounded={true} />}
    // />
  );
};

export default Twitter
