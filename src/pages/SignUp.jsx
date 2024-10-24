import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRight } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase.config";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { fullName, email, password } = formData;

  const navigate = useNavigate();

  // Onchange Fxn
  const onChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };
  // Submit Fxn
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      updateProfile(auth.currentUser, {
        displayName: fullName,
      });
      // Adding User

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timeStamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Successful!");
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error("Something went wrong");
    }
  };

  // Return
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="full name"
            className="nameInput"
            id="fullName"
            value={fullName}
            onChange={onChange}
          />
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

          <div className="signInBar">
            <p className="signInText">Sign Up</p>

            <button className="signInButton" type="submit">
              <ArrowRight fill="#fff" width={"34px"} height={"34px"} />
            </button>
            <Link to={"/sign-in"} className="registerLink">
              Sign In Instead
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
