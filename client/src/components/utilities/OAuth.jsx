import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";

function OAuth({}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      //send response to our backend
      const res = await fetch("api/v1/auth/signWithGoogle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();

      dispatch(signInSuccess(data.validUser));

      navigate("/listings");
    } catch (err) {
      console.log("Couldn't signin with google", err);
    }
  };
  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center w-full bg-theme text-gray-700 border border-gray-100 py-2 rounded-lg hover:bg-btn focus:outline-none focus:ring-2 focus:ring-btn mt-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-95"
        onClick={handleGoogleClick}
      >
        <FcGoogle className="w-6 h-6 mr-3" />
        Continue with Google
      </button>
    </>
  );
}

export default OAuth;
