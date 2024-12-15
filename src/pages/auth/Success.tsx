import CustomText from "../../components/global/CustomText";
import CustomButton from "../../components/global/CustomButton";


type Props = {
  message?: string;
  onGoBack?: () => void;
};

const Success = ({ message = "Operation successful!", onGoBack }: Props) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="mb-4">
          <CustomText
            
            className="text-5xl mb-2"
          >
            🎉
          </CustomText>
          <CustomText
            
            className="text-2xl font-bold text-green-600"
          >
            Success!
          </CustomText>
        </div>
        <CustomText
          className="text-gray-600 mb-6"
        >
            {message}
        </CustomText>
        {onGoBack && (
          <CustomButton
            onClick={onGoBack}
            text="Go Back"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
          />
        )}
      </div>
    </div>
  );
};

export default Success;
