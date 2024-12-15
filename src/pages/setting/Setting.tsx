import CustomButton from '@/components/global/CustomButton';
import { clearUserPreferences } from '@/services/CookieManager';
import { FC } from 'react';
import toast from 'react-hot-toast';

const Setting:FC = () => {
  const handleResetPreferences = () => {
    // Clear user preferences and reset filters
    clearUserPreferences();
    toast.success("Cookie Prefrences cleard.")
  };

  return (
    <div className="h-[92vh] bg-gray-100 flex flex-col items-center p-6 dark:bg-gray-400">
      {/* Settings Header */}

      {/* Settings Container */}
      <div className="bg-white w-full md:w-96 rounded-lg shadow-lg p-6 space-y-6 bg-background text-foreground dark:bg-card dark:text-card-foreground">
        
        {/* Notification Settings */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-700">Notifications</h2>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500 dark:bg-gray-100" />
            <span className="ml-2 text-gray-500">Enable</span>
          </label>
        </div>

        {/* Privacy Settings */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-700">Privacy</h2>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500 dark:bg-gray-100" />
            <span className="ml-2 text-gray-500">Private Account</span>
          </label>
        </div>

        {/* Account Preferences */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-700">Account Preferences</h2>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md w-40 dark:bg-gray-100"
            placeholder="Username"
          />
        </div>

        {/* Reset Preferences Button */}
        <div className="flex justify-center mt-6">
          <CustomButton
            text="Reset Preferences"
            onClick={handleResetPreferences}
            className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Setting;
