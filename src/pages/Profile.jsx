import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase.config";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { fullName, email } = formData;
  const [changeDetails, setChangeDetails] = useState(false);
  const onLoggedOut = () => {
    auth.signOut();
    navigate("/");
  };
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== fullName) {
        await updateProfile(auth.currentUser, { displayName: fullName });
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, { fullName });
        toast.success("Name Update Successful");
      } else if (auth.currentUser.email !== email) {
        await updateProfile(auth.currentUser, { email: email });
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, { email: email });
        toast.success("Email Update Successful");
      } else {
        toast.info("No change was made");
      }
    } catch (error) {
      toast.error("Not Updated");
    }
  };
  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="submit" onClick={onLoggedOut} className="logOut">
          LogOut
        </button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="personalDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prev) => !prev);
            }}
          >
            {changeDetails ? "Done" : "Change"}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input
              type="text"
              id="fullName"
              className={!changeDetails ? "profileName" : "profileNameActive"}
              disabled={!changeDetails}
              value={fullName}
              onChange={onChange}
            />
            <input
              type="email"
              id="email"
              className={!changeDetails ? "profileEmail" : "profileEmailActive"}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;
