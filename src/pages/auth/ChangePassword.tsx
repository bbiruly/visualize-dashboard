import React, { useState } from "react";
import CustomText from "../../components/global/CustomText";
import CustomInput from "../../components/global/CustomInput";
import CustomButton from "../../components/global/CustomButton";


type Props = {};

const ChangePassword = (props: Props) => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    // Add logic to handle password change (API call)
    console.log("Password successfully changed");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <CustomText
          
          className="text-2xl font-bold text-center text-gray-800 mb-6"
        >
            Change Password
        </CustomText>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleChangePassword();
          }}
          className="space-y-6"
        >
          <CustomInput
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current Password"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <CustomInput
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <CustomInput
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <CustomButton
            onClick={handleChangePassword}
            text="Update Password"
            className="block w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
          />
        </form>
        <div className="mt-4 text-sm text-center text-gray-500">
          <CustomText
            
            className="inline"
          >
            Want to go back?
          </CustomText>
          <CustomButton
            onClick={() => console.log("Redirect to profile or settings")}
            text="Cancel"
            className="ml-1 text-blue-500 hover:underline"
          />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
