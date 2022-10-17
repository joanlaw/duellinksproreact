import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Card from "./Card";
import axios from "axios";
import { Pagination } from "./Pagination.js";
import Header from "./Header.js";
import Cardlist from "./Cardlist";
import { render } from "@testing-library/react";
import { Tooltip } from "bootstrap";
import Footer from "./Footer";
import Tooltipsdl from "./Tooltipsdl";
import Cardinfo from "./Cardinfo";

import "./allcards.css";
import "./tooltipsdl.css";

export default function Allcards() {
  const [cardList, setCardList] = useState([]);
  const [search, setSearch] = useState("");
  const [recordForEdit, setrecordForEdit] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(36);

  const [rarezacards, setRarezacards] = useState("");

  useEffect(() => {
    refreshCardList();
  }, []);

  const cardsApi = (url = "https://dlpro-backend.herokuapp.com/cartas/") => {
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
      delete: (id) => axios.delete(url + id),
    };
  };

  //Funcion de búsqueda

  const searcher = (e) => {
    setSearch(e.target.value);
    //console.log(e.target.value);
  };

  //metodo de filtrado 1

  // let results = []
  // if (!search) {
  //   results = cardList
  //  } else {
  //    results = cardList.filter( (dato) =>
  //    dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()))
  //  }

  //Metodo filtrado 2

  const results = !search
    ? cardList
    : cardList.filter((data) =>
        data.nombre.toLowerCase().includes(search.toLowerCase())
      );

  //const results = search? Cardlist : cardList.filter((dato)=>dato.nombre.toLowerCase().includes(search?.toLowerCase()))

  //const results = !search ? cardList : cardList.filter((dato)=> dato.nombre.toLowerCase().includes(search?.toLocaleLowerCase()))

  function refreshCardList() {
    cardsApi()
      .fetchAll()
      .then((res) => setCardList(res.data))
      .catch((err) => console.log(err));
  }

  const addOrEdit = (formData, onSuccess) => {
    //  if (FormData.get('_id') == "0")
    cardsApi()
      .create(formData)
      .then((res) => {
        onSuccess();
        refreshCardList();
      })
      .catch((err) => console.log(err));
    //   else
    //    cardsApi().update(FormData.get('_id'),FormData)
    //   .then(res => {
    //      onSuccess();
    //      refreshCardList();
    //  })
    // .catch(err => console.log(err))
  };

  //  const showRecordDetails = data => {
  //  setrecordForEdit(data)
  //  }

  //Solicitar a la api los datos de cartas para mostrar


  const ImageCard = ({ data }) => (
    <div className="listacards">
      <div className="" >
        
        <img
          src={
            data.rareza === "ur"
              ? "https://res.cloudinary.com/dqofcbeaq/image/upload/v1661106735/iconos%20dlp/UR_rpfhm2.png"
              : data.rareza === "sr"
              ? "https://res.cloudinary.com/dqofcbeaq/image/upload/v1661106742/iconos%20dlp/SR_lwpagj.png"
              : data.rareza === "r" 
              ? "https://res.cloudinary.com/dqofcbeaq/image/upload/v1661106750/iconos%20dlp/R_btrot4.png" 
              : data.rareza === "n"
              ? "https://res.cloudinary.com/dqofcbeaq/image/upload/v1661106746/iconos%20dlp/N_lofrdg.png"
              : data.rareza
          }
          className="rareza"
        ></img>
       
      </div>
      <div>
        <img
          src={`${
            data.limitacion === 3
              ? "https://res.cloudinary.com/dqofcbeaq/image/upload/v1661107087/iconos%20dlp/limited-3-dlp_aq3dv8.svg"
              : ""
          } ${
            data.limitacion === 4
              ? "https://res.cloudinary.com/dqofcbeaq/image/upload/v1665724325/iconos%20dlp/prihibidas_itbkvb.svg"
              : ""
          } ${
            data.limitacion === 2
              ? "https://res.cloudinary.com/dqofcbeaq/image/upload/v1661107082/iconos%20dlp/limited-2-dlp_yf3ttg.svg"
              : ""
          } ${
            data.limitacion === 1
              ? "https://res.cloudinary.com/dqofcbeaq/image/upload/v1661107074/iconos%20dlp/limited-1-dlp_b2mgxg.svg"
              : ""
          }  `}
          className={
            (data.limitacion === "") & 0 ? "ocultarinfoall" : "limitacion"
          }
        ></img>
      </div>
      <div className="grid-list-card  ">
        {" "}
        <Tooltipsdl position="right" content={`${data.nombre } ` } animationDuration={600}>
        <img
          src={data.image.secure_url}
          className="cartatop "
          alt={data.nombre}
        ></img></Tooltipsdl>{" "}
      </div>
    </div>
  );

  //Solicitar a la api datos funcion para limitacion

  //    function imageCard(data){
  //     const imageCard = data()
  //     return (
  //    <div className='card'>
  //     <div><img src={data.rareza} className='rareza'  ></img></div>
  //    <img src={data.image.secure_url} className='card-img-top' height='200px' max-width='121.41px' ></img>
  //   </div>
  //     )
  // }

  // Mostrar numero de cartas actual en el post
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = results.slice(indexOfFirstPost, indexOfLastPost);

  //Cambio de pagina

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Header />
      

      <div className="gridbuscarcarta searchmargen" >
      
        <input
        value={search}
        onChange={searcher}
        className="mb-2 form-control "
        type="search"
        placeholder="Buscar Carta"
        aria-label="Search"
       
      />
      </div>


      <div className="listcards ">
        {currentPost.map((element) => (
          <Link to={`/cartas/${element._id}/${element.nombre}/`}>
            <ImageCard data={element} />
          </Link>
        ))}
      </div>

      <br />
      <Pagination
        postPerPage={postPerPage}
        totalPost={results.length}
        paginate={paginate}
      />

      <div className=""></div>
      <Footer />
    </div>
  );
}
