// // radha
// import React, { useEffect, useState } from "react";

// const App = () => {
//   const [arrayData, setArrayData] = useState([]);
//   // const fetchingData = async () => {
//   //   let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=843746d56f8a4018a7f351d14bded79f&page=$1&category=sports`;
//   //   const response = await fetch(url);
//   //   const data = await response.json();
//   //   setArrayData(data.articles);
//   //   console.log(data.articles);
//   // };
//   // useEffect(() => {
//   //   fetchingData();
//   // }, []);
// useEffect(() => {
//   let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=843746d56f8a4018a7f351d14bded79f&page=$1&category=sports`;
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       setArrayData(...data.articles, console.log(data.articles.slice(4, 7)));
//     });
//   // console.log(arrayData);
// }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=843746d56f8a4018a7f351d14bded79f&page=$1&category=sports`;
//       const response = await fetch(url);
//       const data = await response.json();
//       setArrayData(data.articles);
//       console.log(data);
//     };
//     fetchData();
//   }, []);
//   return (
//     <div className="row">
//       {arrayData.map((article, index) => (
//         <div className="col-md-4" key={index}>
//           {article.title}
//           {/* // desc={article.description}
//             // image={article.urlToImage}
//             // date={article.publishedAt}
//             // url={article.url}
//             // source={article.source.name}
//             // author={article.author} */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default App;

// import { useEffect, useState } from "react";

// const App = () => {
//   const [minutes, setMinutes] = useState(1);
//   const [seconds, setSeconds] = useState(5);
//   useEffect(() => {
//     const timer = setInterval(() => {
//       if (seconds > 0) {
//         setSeconds(seconds - 1);
//       } else if (minutes > 0) {
//         setMinutes(minutes - 1);
//         setSeconds(59);
//       }
//     }, 1000);
//     if (minutes === 0 && seconds === 0) {
//       clearInterval(timer);
//     }
//     return () => clearInterval(timer);
//   }, [minutes, seconds]);
//   return (
//     <div>
//       <span>{minutes + ":" + seconds}</span>
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [article, setArticle] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=843746d56f8a4018a7f351d14bded79f&page=$1&category=sports`;
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     console.log(data.articles);
  //     setArticle(data.articles);
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=843746d56f8a4018a7f351d14bded79f&page=$1&category=sports`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setArticle(data.articles);
      });
  });
  return (
    <div>
      {/* <span>{minutes + ":" + second}</span> */}

      {article.map((item, ind) => (
        // <div className="col-md-4" key={ind}>

        <span>{item.title}</span>

        // <div />
      ))}
    </div>
  );
};

export default App;
