import { useState } from "react";
import { useMemo } from "react";
import CoverageCard from "./GeneralComponents/CoverageCard.tsx";
import { useAppSelector } from "../../redux/reduxTypedHooks";

import "../../models/types.d.ts";
import { Display, TextCenter } from "react-bootstrap-icons";

const FormDataCoverages = ({
  handleCurrentView,
}: {
  handleCurrentView: (pass: boolean) => void;
}) => {
  return (
    <div>
      <div className="my-section">
        <div className="text-center my-4">
          <h2>¡Te ofrecemos estas coberturas!</h2>
        </div>
      </div>
      <CoverageCard
        titulo="Prueba"
        precio="2000"
        items={[true, false, true]}
        onContratar={() => {}}
      />
    </div>
  );
};

export default FormDataCoverages;
