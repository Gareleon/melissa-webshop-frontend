import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import Loading from "../components/Loading";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register a user
  const registerUser = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    setCurrentUser(userCredential.user); // Update user state
    return userCredential;
  };

  //LogIn the user
  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  //Sign up with Google Account
  const signInWithGoogle = async () => {
    return signInWithPopup(auth, googleProvider);
  };

  //LogOut Users
  const logOut = () => {
    return signOut(auth);
  };

  // Track authentication state, Manage User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Set loading false once user state is resolved
      if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
        const { email, displayName, photoURL } = user;
        const userData = {
          email,
          username: displayName,
          photo: photoURL,
        };
      }
    });

    return () => unsubscribe; // Cleanup listener on unmount
  }, []);

  const value = {
    currentUser,
    loading,
    registerUser,
    loginUser,
    signInWithGoogle,
    logOut,
  };

  if (loading) {
    return <Loading />; // Display loading while initializing
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
