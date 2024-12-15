import React, { useState } from "react";
import CustomText from "../../components/global/CustomText";
import CustomInput from "../../components/global/CustomInput";
import CustomButton from "../../components/global/CustomButton";

type Props = {};

const ForgotPassword = (props: Props) => {
  const [email, setEmail] = useState<string>("");

  const handleForgotPassword = () => {
    if (email) {
      // Logic for sending the password reset email
      console.log("Password reset email sent to:", email);
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <CustomText className="text-2xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
        </CustomText>
        <CustomText className="text-sm text-gray-500 text-center mb-4">
          Enter your email to reset your password.
        </CustomText>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleForgotPassword();
          }}
          className="space-y-6"
        >
          <CustomInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <CustomButton
            onClick={handleForgotPassword}
            text="Send Reset Link"
            className="block w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
          />
        </form>
        <div className="mt-4 text-sm text-center text-gray-500">
          <CustomText className="inline">emembered your password?</CustomText>
          <CustomButton
            onClick={() => console.log("Navigate to Sign In")}
            text="Sign In"
            className="ml-1 text-blue-500 hover:underline"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
