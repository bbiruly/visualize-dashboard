import { FC, useState } from "react";
import CustomText from "../../components/global/CustomText";
import CustomInput from "../../components/global/CustomInput";
import CustomButton from "../../components/global/CustomButton";
import bg from "../../assets/bg-backgroud-image.jpg";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/react.svg";
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/userSlice";
import toast from "react-hot-toast";
import { api } from "@/constant/constant";

const SignIn:FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [signInPressed, setSignInPressed] = useState<boolean>(false);

  // HANDLE LOGIN 
  const handleSignIn = async () => {
    setSignInPressed(true);
    try {
      // CALL API LOGIN ENDPOINT
      const response = await axios.post(
        `${api}/auth/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // DESTRUCTURE THE RESPONSE 
      const { message, success, user } = response.data;

      // CHECK THE RESPONSE
      if (success) {
        //SEND USER DATA TO STORE USING REDUX TOOLKIT 
        dispatch(login(user));
        toast.success(message);

        //RESET THE USESTATE
        setEmail('')
        setPassword('')
        setSignInPressed(false)

        // NAVIGATE ANALYTIC PAGE 
        navigate("/analytics");
      }
    } catch (error) {
      console.log("something went wrong", error);
      setSignInPressed(false);
      toast.error(error?.response.data?.message)
    } finally {
      setSignInPressed(false);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-gray-100"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
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

      <div className="p-6 bg-white shadow-lg rounded-lg w-96">
        <CustomText
          className="text-4xl font-bold text-center mb-10 text-gray-800 flex justify-center "
          style={{ fontSize: 20 }}
        >
          Sign In
        </CustomText>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignIn();
          }}
          className="space-y-4 "
        >
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
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <CustomInput
            type={isShowPass ? "text" : "password"}
            placeholder="Password"
            value={password}
            iconLeft={
              <>
                <MdLockOutline />
              </>
            }
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
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <CustomButton
            text={signInPressed ? "Processing..." : "Sign in"}
            onClick={handleSignIn}
            disabled={signInPressed}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
          />
        </form>

        <div className="mt-4 text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
