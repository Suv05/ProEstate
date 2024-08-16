import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";

function OAuth({}) {
  const handelGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
    } catch (err) {}
  };
  return (
    <>
      <button
        type="button"
        className="w-full bg-theme text-white py-2 rounded-lg hover:bg-btn focus:outline-none focus:ring-2 focus:ring-btn mt-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-95"
        onClick={handelGoogleClick}
      >
        Continue with Google
      </button>
    </>
  );
}

export default OAuth;
