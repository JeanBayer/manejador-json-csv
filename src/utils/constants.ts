export const RoutePath = {
  JSON_CSV_CONVERTER: "json-csv-converter",
  STRING_CONVERTER: "string-converter",
  MATCH_LOGIC: "match-logic",
  DUPLICATE_MARKER: "duplicate-marker",
  DUPLICATE_COMPLEX_MARKER: "duplicate-complex-marker",
  PRUEBA: "prueba",
  FORMAT_OTHERS_CASHBACK: "format-others-cashback",
  CALCULATE_WITHDRAWAL_STATUS: "calculate-withdrawal-status",
  SPLIT_DATA: "split-data",
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
  {
    title: "Calculate Withdrawal Status",
    url: `/${RoutePath.CALCULATE_WITHDRAWAL_STATUS}`,
  },
  {
    title: "Split Data",
    url: `/${RoutePath.SPLIT_DATA}`,
  },
] as const;

export const FormatDate = "yyyy-MM-dd'T'HH:mm:ss";
export const FormatDateOtrosCashbackFilename = "yyyyMMdd";

export const ItemsOutputFormat = [
  { value: "json", label: "JSON" },
  { value: "csv", label: "CSV" },
  { value: "ssv", label: "SSV" },
];
