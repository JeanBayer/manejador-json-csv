import { Layout } from "@/layout";
import { RoutePath } from "@/utils/constants";
import { CalculateWithdrawalStatus } from "@calculate-withdrawal-status/page";
import { DuplicateComplexMarkerPage } from "@duplicate-complex-marker/page";
import { DuplicateMarkerPage } from "@duplicate-marker/page";
import { FormatOthersCashbackPage } from "@format-others-cashback/page"; // Importa la nueva página
import { JsonCsvConverterPage } from "@json-csv-converter/page";
import { MatchLogicPage } from "@match-logic/page";
import { PruebaPage } from "@prueba/page";
import { SplitDataPage } from "@split-data/page";
import { StringConverterPage } from "@string-converter/page";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<Navigate to={RoutePath.JSON_CSV_CONVERTER} />}
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
          <Route
            path={RoutePath.FORMAT_OTHERS_CASHBACK}
            element={<FormatOthersCashbackPage />}
          />
          <Route
            path={RoutePath.CALCULATE_WITHDRAWAL_STATUS}
            element={<CalculateWithdrawalStatus />}
          />
          <Route path={RoutePath.SPLIT_DATA} element={<SplitDataPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
