export const RoutePath = {
  JSON_CSV_CONVERTER: "json-csv-converter",
  STRING_CONVERTER: "string-converter",
  MATCH_LOGIC: "match-logic",
  DUPLICATE_MARKER: "duplicate-marker",
  DUPLICATE_COMPLEX_MARKER: "duplicate-complex-marker",
  PRUEBA: "prueba",
  FORMAT_OTHERS_CASHBACK: "format-others-cashback",
};

export const NavItems = [
  { title: "Match logic", url: `/${RoutePath.MATCH_LOGIC}` },
  { title: "String converter", url: `/${RoutePath.STRING_CONVERTER}` },
  { title: "JSON/CSV Converter", url: `/${RoutePath.JSON_CSV_CONVERTER}` },
  { title: "Duplicate Marker", url: `/${RoutePath.DUPLICATE_MARKER}` },
  {
    title: "Duplicate Complex Marker",
    url: `/${RoutePath.DUPLICATE_COMPLEX_MARKER}`,
  },
  { title: "Prueba", url: `/${RoutePath.PRUEBA}` },
  {
    title: "Format Others Cashback",
    url: `/${RoutePath.FORMAT_OTHERS_CASHBACK}`,
  },
] as const;

export const FormatDate = "yyyy-MM-dd'T'HH:mm:ss.SSSSSS";
