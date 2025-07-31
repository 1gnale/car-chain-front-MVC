import { configureStore } from "@reduxjs/toolkit";

import marcasReducer from "./marcaSlice";
import modelosReducer from "./modeloSlice";
import versionReducer from "./versionSlice";

import tipoDocumentosReducer from "./tiposDocumentosSlice";

import provinciasReducer from "./provinciasSlice";
import localidadesReducer from "./localidadesSlice";

import configAntiguedadReducer from "./configAntiguedadSlice";
import configEdadReducer from "./configEdadSlice";
import configLocalidadReducer from "./configLocalidadSlice";

import coberturasReducer from "./coberturaSlice";
import coberturasDetalleReducer from "./coberturaDetalleSlice";
import detallesReducer from "./detallesSlice";

import polizasReducer from "./policeSlice";

import lineaCotizacionReducer from "./lineaCotizacionSlice";

export const store = configureStore({
  reducer: {
    marcas: marcasReducer,
    modelos: modelosReducer,
    versiones: versionReducer,
    tipoDocumentos: tipoDocumentosReducer,
    provincias: provinciasReducer,
    localidades: localidadesReducer,
    configAntiguedades: configAntiguedadReducer,
    configEdades: configEdadReducer,
    configLocalidades: configLocalidadReducer,
    coberturas: coberturasReducer,
    detalles: detallesReducer,
    coberturasDetalles: coberturasDetalleReducer,
    polizas: polizasReducer,
    lineasCotizacion: lineaCotizacionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
