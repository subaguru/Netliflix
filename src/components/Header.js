import React, { useEffect, useState } from "react";
import netflix from "../assets/Netflix_Logo_PMS.png";
import usericon from "../assets/usericon.png";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import downarrow from "../assets/downarrow.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { Link } from "react-router-dom";
import { addShowCards } from "../utils/moviesSlice";

const Header = () => {
  const navigate = useNavigate();
  const user_details = useSelector((store) => store.user);
  const [showdiv, setshowdiv] = useState(false);
  const dispatch = useDispatch();
  const showCards = useSelector((store) => store.movie.showcards);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          }),
        );
        console.log(showCards);
        !showCards && navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signOutfunction = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
      });
  };
  const toggleshow = () => {
    setshowdiv(!showdiv);
  };

  return (
    <>
      <div className="absolute overflow-x-hidden overflow-y-clip w-screen z-20 bg-gradient-to-b from-black">
        <Link to={"/browse"} onClick={() => dispatch(addShowCards(false))}>
          <img className="w-32  z-10 " alt="netflix-logo" src={netflix} />
        </Link>
        {user_details?.uid && (
          <div className="flex justify-end -mt-11  md:-mt-10  items-end  gap-1 pr-6 z-40">
            <img
              className="w-8"
              src={user_details?.photoURL || usericon}
              alt="user-icon"
            />
            <img
              onClick={toggleshow}
              className="z-20 cursor-pointer w-4 rounded-full"
              alt="downarrow"
              src={downarrow}
            />
          </div>
        )}
      </div>
      {showdiv && (
        <div className="w-44 right-0 absolute top-14 h-32 bg-black opacity-90 rounded-md text-gray-400 z-50">
          <ul className="p-3 list-none  font-sans ">
            <li className="text-sm py-2 border-b-2 border-gray-500 border-solid cursor-pointer">
              {user_details?.displayName}
            </li>
            <li
              onClick={() => {
                signOutfunction();
                dispatch(addShowCards(false));
              }}
              className="text-sm py-2 border-b-2 border-gray-500 border-solid cursor-pointer"
            >
              Sign Out
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
