import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

//crear context

export const ModalContext = createContext();

const ModalProvider = (props) => {
  // State del provider
  const [idReceta, guardarIdReceta] = useState(null);
  const [informacion, guardarReceta] = useState({});

  // Una vez que tenemos una receta, llamar la api
  useEffect(() => {
    const obtenerReceta = async () => {
      if (!idReceta) return null;

      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;

      const resultado = await axios.get(url);
      guardarReceta(resultado.data.drinks[0]);
    };
    obtenerReceta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idReceta]);
  return (
    <ModalContext.Provider
      value={{ informacion, guardarIdReceta, guardarReceta }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
