// import React from "react";
// import Card from "./Card";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { IoCloseOutline } from "react-icons/io5";

// const CardList = () => {
//   const [User, setUser] = useState([]);
//   const [expand, setExpand] = useState(false);
//   const [title, settitle] = useState('');
//   const [description, setdescription] = useState('');

//   const openExpand = ({ title, description }) => {
   
//   settitle(title);
//     setdescription(description);
//     console.log(title, description);
//     setExpand(true);
//     console.log(`chlla`);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userdata = await axios.get("http://localhost:3006/getuser");

//         setUser(userdata.data);
//       } catch (error) {
//         console.log(`failed to fetch data ${error.message}`);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className=" w-[95%] flex justify-evenly flex-wrap gap-4 m-auto bg-zinc-600 mt-10 rounded-xl p-4  ">
//       {User.length > 0 ? (
//         <Card openExpand={openExpand} />
//       ) : (
//         <div className="text-white text-4xl"> No user Found !!</div>
//       )}

//       {expand && (
//         <div className=" text-center wrap-break-word fixed top-2 w-[98%] min-h-[80%] h-auto z-10  p-5  bg-red-400 rounded shadow-md">
//           <button
//             className="absolute top-1 right-1 p-1 rounded cursor-pointer"
//             onClick={() => {
//               setExpand(false);
//             }}
//           >
//             <IoCloseOutline />
//           </button>
//           <h3 className="font-extrabold text-4xl mb-5">{title}</h3>
//           <p className="text-lg overflow-y-scroll"> {description}.</p>
          
//         </div>
//       )}
//     </div>
//   );
// };

// export default CardList;

import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoCloseOutline } from "react-icons/io5";

const CardList = () => {
  const [User, setUser] = useState([]);
  const [expand, setExpand] = useState(false);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");

  const openExpand = ({ title, description }) => {
    settitle(title);
    setdescription(description);
    setExpand(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userdata = await axios.get("http://localhost:3006/getuser");
        setUser(userdata.data);
      } catch (error) {
        console.log(`failed to fetch data ${error.message}`);
      }
    };
    fetchData();
  }, []);

  // 🛑 Prevent background scroll when modal is open
  useEffect(() => {
    if (expand) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [expand]);

  return (
    <div className="w-[95%] flex justify-evenly flex-wrap gap-4 m-auto bg-zinc-600 mt-10 rounded-xl p-4">
      {User.length > 0 ? (
        <Card openExpand={openExpand} />
      ) : (
        <div className="text-white text-4xl"> No user Found !!</div>
      )}

      {expand && (
        <>
          {/* 🔲 Overlay */}
          <div className="fixed inset-0 bg-black/2 bg-opacity-50 backdrop-blur-sm z-40"></div>

          {/* 🧾 Modal */}
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                          w-[90%] max-w-[700px] max-h-[80%] overflow-y-auto wrap-break-word
                          z-50 p-6 bg-white rounded-xl shadow-lg"
          >
            <button
              className="absolute top-2 right-2 text-xl text-gray-600 hover:text-black"
              onClick={() => {
                setExpand(false);
              }}
            >
              <IoCloseOutline />
            </button>
            <h3 className="font-bold text-2xl mb-4">{title}</h3>
            <p className="text-gray-800 text-base whitespace-pre-line">
              {description}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CardList;
