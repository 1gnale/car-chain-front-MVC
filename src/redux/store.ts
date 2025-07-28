import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD

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
=======
import documentTypeReducer from "./documentTypeSlice";
import provincesReducer from "./provincesSlice";
import coverageAllDataReducer from "./coverageAllDataSlice";
import brandReducer from "./brandSlice";
import allConfigsReducer from "./allConfigsSlice";
export const store = configureStore({
  reducer: {
    brands: brandReducer,
    documentTypes: documentTypeReducer,
    provinces: provincesReducer,
    coverages: coverageAllDataReducer,
    allConfigs: allConfigsReducer,
>>>>>>> 6dfb311c487c656e9fc313787326a431e4567f0e
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
