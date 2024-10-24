import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRight } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import OAuth from "../Components/OAuth";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
        toast.success("Successfully Logged In");
        console.log(userCredential.user);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="email"
            className="emailInput"
            id="email"
            value={email}
            onChange={onChange}
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              className="passwordInput"
              id="password"
              value={password}
              onChange={onChange}
            />
            <img
              src={visibilityIcon}
              alt="toggleIcon"
              className="showPassword"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </div>
          <Link to={"/forgot-password"} className="forgotPasswordLink">
            forgot password?
          </Link>
          <div className="signInBar">
            <p className="signInText">Sign In</p>

            <button className="signInButton">
              <ArrowRight fill="#fff" width={"34px"} height={"34px"} />
            </button>
            <Link to={"/sign-up"} className="registerLink">
              Sign Up Instead
            </Link>
          </div>
        </form>
        <OAuth />
      </div>
    </>
  );
};

export default SignIn;
