import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCQPY84sXe2ZmNE0OA-fawkIePoclIT0a4",
    authDomain: "netflix-cloney-229aa.firebaseapp.com",
    projectId: "netflix-cloney-229aa",
    storageBucket: "netflix-cloney-229aa.appspot.com",
    messagingSenderId: "983151657650",
    appId: "1:983151657650:web:fd8adbf94fc97a5e8effab",
    measurementId: "G-6YDT4VVG66"
  };

  initializeApp(firebaseConfig);
  const storage = getStorage();

  export default storage;