import { Layout } from "@/layout";
import { DuplicateComplexMarkerPage } from "@/pages/duplicate-complex-marker-page/page";
import { DuplicateMarkerPage } from "@/pages/duplicate-marker-page/page"; // Importa la nueva página
import { JsonCsvConverterPage } from "@/pages/json-csv-converter-page/page";
import { MatchLogicPage } from "@/pages/match-logic/page";
import { PruebaPage } from "@/pages/prueba/page";
import { StringConverterPage } from "@/pages/string-converter/page";
import { RoutePath } from "@/utils/constants";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<Navigate to={RoutePath.JSON_CSV_CONVERTER} replace />}
          />
          <Route
            path={RoutePath.STRING_CONVERTER}
            element={<StringConverterPage />}
          />
          <Route path={RoutePath.MATCH_LOGIC} element={<MatchLogicPage />} />
          <Route
            path={RoutePath.JSON_CSV_CONVERTER}
            element={<JsonCsvConverterPage />}
          />
          <Route
            path={RoutePath.DUPLICATE_MARKER}
            element={<DuplicateMarkerPage />}
          />
          <Route
            path={RoutePath.DUPLICATE_COMPLEX_MARKER}
            element={<DuplicateComplexMarkerPage />}
          />
          <Route path={RoutePath.PRUEBA} element={<PruebaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
