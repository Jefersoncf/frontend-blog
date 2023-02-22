import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formaData = new FormData();
      formaData.append("file", file);
      const response = await axios.post("/upload", formaData);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const urlImg = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? urlImg : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? urlImg : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          // value={title}
          placeholder="Titulo"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
          ;
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publicar</h1>
          <span>
            <b>Status: </b> Rascunho
          </span>

          <span>
            <b>Visibilidade: </b> Publico
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Carregar Imagem
          </label>
          <div className="buttons">
            <button>Salve como rascunho</button>
            <button onClick={handleClick}>Plublicar</button>
          </div>
        </div>
        <div className="item">
          <h1>Categoria</h1>

          <div className="cat">
            <input
              type="radio"
              name="cat"
              checked={cat === "art"}
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Arte</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              name="cat"
              checked={cat === "science"}
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Ciencia</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              name="cat"
              checked={cat === "technology"}
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Tecnologia</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              name="cat"
              checked={cat === "cinema"}
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              name="cat"
              checked={cat === "design"}
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              name="cat"
              checked={cat === "food"}
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Comida</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
