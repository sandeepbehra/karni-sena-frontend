"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

const AuthContext = createContext(null);

const STORAGE_KEY =
  "karni_sena_user";

const AUTH_CHANGE_EVENT =
  "karni_sena_auth_change";

/*
==========================================
SUBSCRIBE
==========================================

storage event:
- dusre browser tab me localStorage change ho

custom event:
- same tab me login/logout/update ho
*/

function subscribe(callback) {
  window.addEventListener(
    "storage",
    callback
  );

  window.addEventListener(
    AUTH_CHANGE_EVENT,
    callback
  );

  return () => {
    window.removeEventListener(
      "storage",
      callback
    );

    window.removeEventListener(
      AUTH_CHANGE_EVENT,
      callback
    );
  };
}

/*
==========================================
CLIENT SNAPSHOT
==========================================
*/

function getSnapshot() {
  return (
    localStorage.getItem(
      STORAGE_KEY
    ) || ""
  );
}

/*
==========================================
SERVER SNAPSHOT
==========================================

Server aur hydration ke first render
dono me empty string milegi.

Isi wajah se hydration mismatch nahi hoga.
*/

function getServerSnapshot() {
  return "";
}

/*
==========================================
TRIGGER AUTH UPDATE
==========================================
*/

function notifyAuthChange() {
  window.dispatchEvent(
    new Event(
      AUTH_CHANGE_EVENT
    )
  );
}

/*
==========================================
SAVE USER
==========================================
*/

function saveUser(userData) {
  if (!userData) {
    localStorage.removeItem(
      STORAGE_KEY
    );
  } else {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(userData)
    );
  }

  notifyAuthChange();
}

/*
==========================================
READ CURRENT USER
==========================================
*/

function getCurrentUser() {
  try {
    const storedUser =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (!storedUser) {
      return null;
    }

    return JSON.parse(
      storedUser
    );
  } catch (error) {
    console.error(
      "Unable to read stored user:",
      error
    );

    return null;
  }
}

/*
==========================================
AUTH PROVIDER
==========================================
*/

export function AuthProvider({
  children,
}) {
  /*
  Important:

  server:
  storedUserString = ""

  first client hydration:
  storedUserString = ""

  hydration complete hone ke baad:
  localStorage actual value receive hogi
  */

  const storedUserString =
    useSyncExternalStore(
      subscribe,
      getSnapshot,
      getServerSnapshot
    );

  /*
  ========================================
  PARSE USER
  ========================================
  */

  const user = useMemo(() => {
    if (!storedUserString) {
      return null;
    }

    try {
      return JSON.parse(
        storedUserString
      );
    } catch (error) {
      console.error(
        "Invalid stored user:",
        error
      );

      return null;
    }
  }, [storedUserString]);

  /*
  ========================================
  LOGIN
  ========================================
  */

  const login = (userData) => {
    saveUser(userData);
  };

  /*
  ========================================
  SIGNUP
  ========================================
  */

  const signup = (userData) => {
    saveUser(userData);
  };

  /*
  ========================================
  SET USER
  ========================================

  Existing code compatibility ke liye.
  */

  const setUser = (
    userData
  ) => {
    saveUser(userData);
  };

  /*
  ========================================
  UPDATE USER
  ========================================
  */

  const updateUser = (
    updatedData
  ) => {
    const currentUser =
      getCurrentUser();

    if (!currentUser) {
      return;
    }

    const updatedUser = {
      ...currentUser,
      ...updatedData,
    };

    saveUser(
      updatedUser
    );
  };

  /*
  ========================================
  UPDATE MEMBERSHIP
  ========================================
  */

  const updateMembership = (
    membershipData
  ) => {
    const currentUser =
      getCurrentUser();

    if (!currentUser) {
      return;
    }

    const updatedUser = {
      ...currentUser,

      membership: {
        ...(
          currentUser.membership ||
          {}
        ),

        ...membershipData,
      },
    };

    saveUser(
      updatedUser
    );
  };

  /*
  ========================================
  LOGOUT
  ========================================
  */

  const logout = () => {
    saveUser(null);
  };

  /*
  ========================================
  AUTH STATE
  ========================================

  Abhi frontend mock auth hai,
  isliye async loading false rakha hai.

  Backend /me API ke time
  actual loading implement karenge.
  */

  const loading = false;

  const isLoggedIn =
    Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,

        login,
        signup,
        logout,

        updateUser,
        updateMembership,

        loading,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/*
==========================================
AUTH HOOK
==========================================
*/

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
// "use client";

// import {
//   createContext,
//   useContext,
//   useState,
// } from "react";

// const AuthContext = createContext(null);

// const STORAGE_KEY = "karni_sena_user";

// export function AuthProvider({ children }) {
//   /*
//   ===========================================
//   INITIAL USER
//   ===========================================
//   */

//   const [user, setUser] = useState(() => {
//     if (typeof window === "undefined") {
//       return null;
//     }

//     try {
//       const storedUser =
//         localStorage.getItem(STORAGE_KEY);

//       return storedUser
//         ? JSON.parse(storedUser)
//         : null;
//     } catch (error) {
//       console.error(
//         "Error reading stored user:",
//         error
//       );

//       return null;
//     }
//   });

//   /*
//   Ab localStorage read ke liye
//   useEffect nahi chahiye.
//   */

//   const loading = false;

//   /*
//   ===========================================
//   LOGIN
//   ===========================================
//   */

//   const login = (userData) => {
//     setUser(userData);

//     localStorage.setItem(
//       STORAGE_KEY,
//       JSON.stringify(userData)
//     );
//   };

//   /*
//   ===========================================
//   SIGNUP
//   ===========================================
//   */

//   const signup = (userData) => {
//     setUser(userData);

//     localStorage.setItem(
//       STORAGE_KEY,
//       JSON.stringify(userData)
//     );
//   };

//   /*
//   ===========================================
//   UPDATE USER
//   ===========================================
//   */

//   const updateUser = (updatedData) => {
//     setUser((prevUser) => {
//       const updatedUser = {
//         ...prevUser,
//         ...updatedData,
//       };

//       localStorage.setItem(
//         STORAGE_KEY,
//         JSON.stringify(updatedUser)
//       );

//       return updatedUser;
//     });
//   };

//   /*
//   ===========================================
//   UPDATE MEMBERSHIP
//   ===========================================
//   */

//   const updateMembership = (
//     membershipData
//   ) => {
//     setUser((prevUser) => {
//       if (!prevUser) {
//         return prevUser;
//       }

//       const updatedUser = {
//         ...prevUser,

//         membership: {
//           ...prevUser.membership,
//           ...membershipData,
//         },
//       };

//       localStorage.setItem(
//         STORAGE_KEY,
//         JSON.stringify(updatedUser)
//       );

//       return updatedUser;
//     });
//   };

//   /*
//   ===========================================
//   LOGOUT
//   ===========================================
//   */

//   const logout = () => {
//     setUser(null);

//     localStorage.removeItem(
//       STORAGE_KEY
//     );
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,

//         setUser,

//         login,

//         signup,

//         logout,

//         updateUser,

//         updateMembership,

//         loading,

//         isLoggedIn: Boolean(user),
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context =
//     useContext(AuthContext);

//   if (!context) {
//     throw new Error(
//       "useAuth must be used inside AuthProvider"
//     );
//   }

//   return context;
// }