import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { motion } from "framer-motion";

import Checkmark from "../components/Checkmark";

interface Item {
  name: string,
  done: boolean,
  uuid: string
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

export default function Home(props) {
  const [state, setState] = useState<Item[]>([])

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
      <h1 className="py-16 text-center text-7xl font-bold text-white bg-gradient-to-br from-cyan-500 to-fuchsia-500">
        Todo.ts
      </h1>
      {state.map((item: Item, index) => (
        <motion.div
          variants={itemAnimation}
          initial="hidden"
          animate="show"
          transition={{
            staggerChildren: 0.5,
          }}
          layout
          className="bg-gradient-to-r from-slate-700 to-slate-800 m-4 p-6 rounded-lg shadow flex flex-row"
          key={item.uuid}
        >
          <Checkmark onChange={() => updateDone(index)} value={item.done} />
          <p className="text-3xl text-white flex-grow">{item.name}</p>
          <p
            className="text-3xl text-fuchsia-500 cursor-pointer"
            onClick={() => removeItem(index)}
          >
            Delete
          </p>
        </motion.div>
      ))}
      <Input onSubmit={(value:string) => addItem(value)} />
    </>
  );
}

function Input(props) {
  const [state, setState] = useState("")

  return (
    <motion.div layout className="m-4 rounded-lg flex gap-4">
      <input
        className="w-0 flex-grow bg-gradient-to-r bg-slate-800 focus:bg-slate-700 p-6 rounded-lg text-white outline-none transition duration-500 text-3xl shadow"
        value={state}
        onChange={(e) => setState(e.target.value)}
        onKeyPress={(e) => (e.key == "Enter" ? props.onSubmit(state) : "")}
      />
      <button
        className="bg-gradient-to-tr from-teal-400 to-violet-500 rounded-lg px-10 text-3xl text-white font-bold transform scale-100 hover:scale-95 active:scale-100 transition duration-250 shadow hover:shadow-sm active:shadow-md"
        onClick={() => props.onSubmit(state)}
      >
        Enter
      </button>
    </motion.div>
  );
}