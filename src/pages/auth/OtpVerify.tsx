import React, { useState } from "react";
import CustomText from "../../components/global/CustomText";
import CustomInput from "../../components/global/CustomInput";
import CustomButton from "../../components/global/CustomButton";

type Props = {};

const OtpVerify = (props: Props) => {
  const [otp, setOtp] = useState<string>("");

  const handleOtpChange = (value: string) => {
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value); // Restrict input to numbers and max 6 digits
    }
  };

  const handleVerify = () => {
    if (otp.length === 6) {
      // Proceed with OTP verification logic (API call)
      console.log("OTP Verified:", otp);
    } else {
      alert("Please enter a valid 6-digit OTP.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <CustomText
         
          className="text-2xl font-bold text-center text-gray-800 mb-6"
        >
            OTP Verification
        </CustomText>
        <CustomText
          
          className="text-sm text-gray-500 text-center mb-4"
        >
            Enter the 6-digit code sent to your email or phone.
        </CustomText>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerify();
          }}
          className="space-y-6"
        >
          <CustomInput
            type="text"
            value={otp}
            onChange={(e) => handleOtpChange(e.target.value)}
            placeholder="Enter OTP"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none tracking-widest text-lg"
          />
          <CustomButton
            onClick={handleVerify}
            text="Verify OTP"
            className="block w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
          />
        </form>
        <div className="mt-4 text-sm text-center text-gray-500">
          <CustomText className="inline" >
            Didn't receive the code?
          </CustomText>
          <CustomButton
            onClick={() => console.log("Resend OTP clicked")}
            text="Resend OTP"
            className="ml-1 text-blue-500 hover:underline"
          />
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
