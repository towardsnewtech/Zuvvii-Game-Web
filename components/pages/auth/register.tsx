import React, { useState } from "react";
import { useRouter } from "next/router";

import RegisterForm from "modules/Register";

const RegisterPage = () => {
  const router = useRouter();

  const onSuccess = () => {
    router.push("/home");
  };

  return (
    <RegisterForm 
        key={'register_form'}
        apiEndpoint={`/Users/webregister`}
        onAPICallSuccess={onSuccess}
    />
  );
};

export default RegisterPage;
