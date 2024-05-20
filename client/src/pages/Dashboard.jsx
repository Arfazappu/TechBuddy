import { Send, SendHorizontal } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Sparkles } from "lucide-react";

function Dashboard() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePromptClick = (promptText) => {
    setMessage(promptText);
  };

  const handleSend = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <main className="flex w-full flex-col items-center justify-center h-[100dvh] bg-gray-100 dark:bg-gray-900 px-4 md:px-6">
      <div className="max-w-fit w-full space-y-6">
        <h1 className="text-5xl text-center font-bold text-gray-900 dark:text-gray-50">
          Learn. Practice. Repeat.
        </h1>
        <p className="text-center text-md leading-3 text-gray-300">
          {" "}
          Generate assessment with{" "}
          <Sparkles
            className="inline h-4 w-4 text-blue-400"
            data-aos="zoom-in"
            data-aos-delay="300"
          />
          TechBuddy using simple prompt.{" "}
        </p>
        <div className="flex items-center w-full rounded-md bg-white dark:bg-gray-800 shadow">
          <input
            className="flex-1 px-4 py-3 text-gray-900 dark:text-gray-50 bg-transparent focus:outline-none"
            placeholder="Write Your Topic..."
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="p-[0.8rem] rounded-br-md rounded-tr-md h-full bg-gray-900 text-gray-50 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-400 dark:focus:ring-gray-600"
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <SendHorizontal className="h-5 w-5" />
            )}
          </button>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2"
            onClick={() => handlePromptClick("Async Await")}
          >
            Async Await
          </button>
          <button
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2"
            onClick={() => handlePromptClick("useState() hook")}
          >
            useState() hook
          </button>
          <button
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2"
            onClick={() => handlePromptClick("Higher order function")}
          >
            Higher order function
          </button>
        </div>
      </div>
    </main>
  );
}

function LoadingSpinner() {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-black"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Dashboard;
