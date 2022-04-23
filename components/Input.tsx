import { useState, useRef } from "react"
import { motion } from "framer-motion"
import Head from "next/head"

export default function Input(props) {
  const [state, setState] = useState("");
  const inputRef = useRef(null);

  function handleSubmit(e) {
    if (e.type == "keypress" && e.key == "Enter" && state.trimStart().length > 0) {
      props.onSubmit(state)
      setState("");
    } else if (e.type == "click" && state.trimStart().length > 0) {
      props.onSubmit(state);
      setState("")
    };
  }

  return (
    <>
      <Head>
        <title>Todo.ts</title>
      </Head>
      <motion.div layout className="m-4 rounded-lg flex gap-4">
        <div className="relative flex-grow">
          <input
            className="w-full bg-gradient-to-r bg-slate-800 focus:bg-slate-700 p-6 rounded-lg text-white outline-none transition duration-500 text-3xl shadow"
            value={state}
            onChange={(e) => setState(e.target.value)}
            onKeyPress={handleSubmit}
            ref={inputRef}
            name="item name"
            id="item name"
            required={true}
          />
          <motion.label
            onClick={() => inputRef.current && inputRef.current.focus()}
            layout
            htmlFor="item name"
            className={`absolute text-slate-500 top-0 left-0 m-6 transition-all duration-200 cursor-text ${
              state.length > 0 ? "text-sm mt-2" : "text-3xl mt-6"
            }`}
          >
            Enter item name:
          </motion.label>
        </div>
        <button
          className="bg-gradient-to-tr from-teal-400 to-violet-500 rounded-lg px-10 text-3xl text-white font-bold transform scale-100 hover:scale-95 active:scale-100 transition duration-250 shadow hover:shadow-sm active:shadow-md"
          onClick={handleSubmit}
        >
          Enter
        </button>
      </motion.div>
    </>
  );
}