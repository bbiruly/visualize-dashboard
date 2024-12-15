import { useState } from "react";
import CustomText from "../../components/global/CustomText";
import CustomInput from "../../components/global/CustomInput";
import CustomButton from "../../components/global/CustomButton";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import bg from '../../assets/bg-backgroud-image.jpg'
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import logo from "../../assets/react.svg";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState("");
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [isShowConPass, setIsShowConPass] = useState<boolean>(false);
  const [signUpPressed, setSignUpPressed] = useState<boolean>(false);

  //HANDLE SIGN UP
  const handleSignUp = async () => {
    setSignUpPressed(true)
    // CHECK THE PASSWORD IN CLIENT SIDE
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.")
      setError("Passwords do not match.")
      setSignUpPressed(false)
      return;
    }
    //CHECK THE EMAIL AND PASSWORD ARE NULL OR NOT
    if (email === "" || password === "") {
      toast.error("Please fill all the fields.")
      setError("Please fill all the fields.")
      setSignUpPressed(false)
      return;
    }

    try {
      //CALL API SIGN UP ENPONT 
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        { name, email, password }
      );

      // DESTRUCTURE 
      const { success, message } = response.data;
      
      if (success) {
        toast.success(message);
        navigate("/login");
        //reset the value
        setName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setSignUpPressed(false)
      }
    } catch (error) {
      console.log("somthing went wrong", error);
      toast.error("Something went wrong");
      setSignUpPressed(false)
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100" style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}>
        <div className="flex justify-center items-center mb-24 gap-x-3">
        <img
          src={logo}
          alt="brand-logo"
          className="hover:shadow-2xl hover:shadow-blue-500"
        />
        <CustomText className="" style={{ fontSize: 24 }}>
          Visualization Dashbaord
        </CustomText>
      </div>
      <div className="w-96 max-w-md bg-white p-8 rounded-lg shadow-lg">
        <CustomText className="text-2xl font-bold text-center mb-6 text-gray-800" style={{fontSize: 20}}>
          Sign Up
        </CustomText>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
          className="space-y-4"
        >
          <CustomInput
            type="text"
            placeholder="Name"
            iconLeft={<><FaRegUser /></>}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <CustomInput
            type="email"
            placeholder="Email"
            value={email}
            iconLeft={
                <>
                  <MdOutlineEmail />
                </>
              }
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <CustomInput
            type={isShowPass ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            iconLeft={<><MdLockOutline/></>}
            iconRight={
                <>
                  {isShowPass ? (
                    <AiOutlineEyeInvisible
                      onClick={() => {
                        setIsShowPass(!isShowPass);
                      }}
                    />
                  ) : (
                    <AiOutlineEye
                      onClick={() => {
                        setIsShowPass(!isShowPass);
                      }}
                    />
                  )}
                </>
              }
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <CustomInput
            type={isShowConPass ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            iconLeft={<><MdLockOutline/></>}
            iconRight={
                <>
                  {isShowConPass ? (
                    <AiOutlineEyeInvisible
                      onClick={() => {
                        setIsShowConPass(!isShowConPass);
                      }}
                    />
                  ) : (
                    <AiOutlineEye
                      onClick={() => {
                        setIsShowConPass(!isShowConPass);
                      }}
                    />
                  )}
                </>
              }
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <CustomButton
            text={signUpPressed ? "Processing": "Sign up"}
            disabled={signUpPressed}
            onClick={handleSignUp}
            className="block w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
          />
        </form>
        <div className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
