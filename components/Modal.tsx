import { signInWithRedirect, signInAnonymously } from "firebase/auth";

export default function Modal(props) {
  return (
    <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-screen h-screen bg-black bg-opacity-40 z-40">
      <div className="fixed bg-gradient-to-tr from-green-500 to-emerald-700 w-[40rem] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-8 rounded-lg shadow-2xl z-50">
        <h2 className="text-white font-bold text-center text-5xl pb-4">
          Please Sign In
        </h2>
        <p className="text-gray-200 text-xl">
          To allow for the best experience please sign in using Google. The only
          information we store is the items you enter in this website. If you
          are not comfortable doing this you can also sign in anonymously.
        </p>
        <div className="mt-10 text-center">
          <button
            onClick={() => signInAnonymously(props.auth)}
            className="text-2xl text-white font-bold bg-gradient-to-tr from-sky-400 to-teal-500 p-2 rounded m-2 scale-100 hover:scale-[.97] active:scale-[1.01] transition"
          >
            Continue as guest
          </button>
          <button
            onClick={() => signInWithRedirect(props.auth, props.provider)}
            className="text-2xl text-white font-bold bg-gradient-to-tr from-sky-400 to-teal-500 p-2 rounded m-2 scale-100 hover:scale-[.97] active:scale-[1.01] transition"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
