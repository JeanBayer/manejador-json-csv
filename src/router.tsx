import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout";
import { MatchLogicPage } from "./pages/match-logic/page";
import { StringConverterPage } from "./pages/string-converter/page";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="string-converter" element={<StringConverterPage />} />
          <Route path="match-logic" element={<MatchLogicPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
