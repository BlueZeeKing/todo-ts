import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { motion } from "framer-motion";
import Head from "next/head";

import Checkmark from "../components/Checkmark";
import Input from "../components/Input";
import Modal from "../components/Modal";

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAre_ZQ0KzQs6D2av2D9GC9Iax4xvdUuzY",
  authDomain: "todots-4aedc.firebaseapp.com",
  projectId: "todots-4aedc",
  storageBucket: "todots-4aedc.appspot.com",
  messagingSenderId: "625564911126",
  appId: "1:625564911126:web:0c23d0b0f520d823855737",
};

interface Item {
  name: string,
  done: boolean,
  uuid: string,
}

const itemAnimation = {
  hidden: { x: typeof window != "undefined" ? window.innerWidth : 100 },
  show: {
    x: 0,
    transition: {
      delay: 0.3,
      type: "spring",
      stiffness: 200,
      damping: 22
    },
  },
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export default function Home(props) {
  const [state, setState] = useState<Item[]>([])
  const [user, setUser] = useState<User>(undefined);
  const [signInDetermined, setSignIn] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setSignIn(true);
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            setState(docSnap.data().items);
          } else {
            console.log("No such document!");
          }
        });
      } else {
        setUser(null);
        setSignIn(true);
      }
    });
  }, [])

  useEffect(() => {
    if (user && state.length > 0) {
      setDoc(doc(db, "users", user.uid), { items: state });
    }
  })

  const updateDone = (index:number) => {
    let stateCopy = [...state]
    stateCopy[index].done = !stateCopy[index].done;
    setState(stateCopy)
  }

  const addItem = (name:string) => {
    setState(state.concat([{ name: name, done: false, uuid: nanoid() }]));
  }

  const removeItem = (index:number) => {
    setState(state.slice(0, index).concat(state.slice(index + 1)));
  };

  return (
    <>
      <Head>
        <title>Todo.ts</title>
      </Head>
      {!user && signInDetermined ? <Modal auth={auth} provider={provider} /> : ""}
      <h1 className="py-16 text-center text-7xl font-bold text-white bg-gradient-to-br from-cyan-500 to-fuchsia-500">
        Todo.ts
      </h1>
      {state
        .sort((a, b) => +a.done - +b.done)
        .map((item: Item, index) => (
          <motion.div
            variants={itemAnimation}
            initial="hidden"
            animate="show"
            transition={{
              staggerChildren: 0.5,
            }}
            layout
            className="bg-gradient-to-r from-slate-700 to-slate-800 m-2 p-3 md:m-4 md:p-6 rounded-lg shadow flex flex-row"
            key={item.uuid}
          >
            <Checkmark onChange={() => updateDone(index)} value={item.done} />
            <p
              className={`after:content-[""] ${
                item.done ? "after:w-[calc(100%+20px)]" : "after:w-0"
              } after:transition-all after:absolute after:bg-gray-600 after:left-0 after:top-[calc(50%-0.125rem)] after:ml-[-10px] after:h-[0.2rem] relative text-3xl transition duration-200 ${
                item.done ? "text-gray-500" : "text-white"
              }`}
            >
              {item.name}
            </p>
            <span className="flex-grow"></span>
            <button
              className="text-3xl text-fuchsia-500 active:text-fuchsia-400 transition duration-200 cursor-pointer"
              onClick={() => removeItem(index)}
              tabIndex={0}
              role="button"
              aria-label="task completed"
            >
              Delete
            </button>
          </motion.div>
        ))}
      <Input onSubmit={(value: string) => addItem(value)} />
      <div className="p-12"></div>
    </>
  );
}