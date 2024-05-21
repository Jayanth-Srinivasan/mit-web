import { Route, Routes, useNavigate } from "react-router-dom";
import Hero from "./components/Hero";
import Home from "./components/Home";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

function App() {

  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const onSignIn = () => {
    signInWithPopup(auth, googleProvider).then((user) => {
      console.log(user);
      navigate('/home');
    }).catch((error) => {
      console.log(error.message);
    });
  }
  return (
    <Routes>
      <Route path="/" element={<Hero onSignIn={onSignIn} />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
