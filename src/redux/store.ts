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

import periodoPagoReducer from "./periodoPagosSlice";

import tipoContratacionReduer from "./hiringTypesSlice";

import clientReducer from "./clientSlice";

import cotizacionReducer from "./cotizacionSlice";

import usuarioReducer from "./usuariosSlice";

import historyPolicyReducer from "./historySlice";

import pagoReducer from "./pagoSlice";

import sexoReducer from "./sexosSlice";

import tipoUsuarioReducer from "./tipoUsuarioSlice";

import siniestroReducer from "./siniestroSlice";

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
    periodosPago: periodoPagoReducer,
    tiposContratacion: tipoContratacionReduer,
    cliente: clientReducer,
    cotizacion: cotizacionReducer,
    usuarios: usuarioReducer,
    historial: historyPolicyReducer,
    pago: pagoReducer,
    sexo: sexoReducer,
    tipoUsuario: tipoUsuarioReducer,
    siniestros: siniestroReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
