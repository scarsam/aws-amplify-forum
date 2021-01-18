import React, { useState } from "react";
import { useStep } from "react-hooks-helper";
import ResetPasswordStep1 from "./ResetPasswordStep1";
import ResetPasswordStep2 from "./ResetPasswordStep2";

const steps = [{ id: "step1" }, { id: "step2" }];

const ResetPasswordFlow = () => {
  const [email, setEmail] = useState(null);
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;

  switch (id) {
    case "step1":
      return (
        <ResetPasswordStep1 handleEmail={setEmail} navigation={navigation} />
      );
    case "step2":
      return (
        <ResetPasswordStep2
          email={email}
          handleEmail={setEmail}
          navigation={navigation}
        />
      );
    default:
      return null;
  }
};

export default ResetPasswordFlow;
