import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as PersonOutllineIcon } from "../assets/svg/personOutlineIcon.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const checkLocation = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };
  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li
            className="navbarListItem"
            onClick={() => {
              navigate("/");
            }}
          >
            <ExploreIcon
              fill={checkLocation("/") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
            />
            <p
              className={
                checkLocation("/")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Explore
            </p>
          </li>
          <li
            className="navbarListItem"
            onClick={() => {
              navigate("/offers");
            }}
          >
            <OfferIcon
              fill={checkLocation("/offers") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
            />
            <p
              className={
                checkLocation("/offers")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Offers
            </p>
          </li>
          <li
            className="navbarListItem"
            onClick={() => {
              navigate("/profile");
            }}
          >
            <PersonOutllineIcon
              fill={checkLocation("/profile") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
            />
            <p
              className={
                checkLocation("/profile")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Navbar;

// import { Link } from "react-router-dom";
// import explore from "../assets/svg/exploreIcon.svg";
// import offer from "../assets/svg/localOfferIcon.svg";
// import profile from "../assets/svg/personIcon.svg";

// const Navbar = () => {
//   const Links = [
//     { id: 1, img: explore, link: "/", alt: "explore" },
//     { id: 2, img: offer, link: "/offers", alt: "offer" },
//     { id: 3, img: profile, link: "/profile", alt: "profile" },
//   ];
//   return (
//     <div className="navbar">
//       {Links.map((link, index) => (
//         <Link key={index} className="navbarNav" to={link.link}>
//           <img src={link.img} alt={link.alt} />
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default Navbar;
