import { Layout } from "@/layout";
import { JsonCsvConverterPage } from "@/pages/json-csv-converter-page/page";
import { MatchLogicPage } from "@/pages/match-logic/page";
import { StringConverterPage } from "@/pages/string-converter/page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DuplicateMarkerPage } from "@/pages/duplicate-marker-page/page"; // Importa la nueva página

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="string-converter" element={<StringConverterPage />} />
          <Route path="match-logic" element={<MatchLogicPage />} />
          <Route path="json-csv-converter" element={<JsonCsvConverterPage />} />
          <Route path="duplicate-marker" element={<DuplicateMarkerPage />} /> {/* Agrega la nueva ruta */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
