import React from "react";
import Logo from "../assets/logo-at.png";

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="Logo do blog" />

      <span>
        Criado por{" "}
        <a href="https://github.com/Jefersoncf" target="_blank">
          Fjeferson
        </a>{" "}
        | <span className="far fa-copyright"></span>&copy; 2023 Todos os
        direitos reservados.
      </span>
    </footer>
  );
};

export default Footer;
