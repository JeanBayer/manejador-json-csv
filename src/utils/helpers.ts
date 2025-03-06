import { ComplexDuplicateOutput, OutPutItemJSON } from "@/types/output";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { v4 as uuidv4 } from "uuid";
import { FormatDate } from "./constants";
import { extractRut, isRutValid } from "./rut";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const matchData = <T>(
  json1: OutPutItemJSON[] | null = [],
  matchField1: string = "",
  json2: OutPutItemJSON[] | null = [],
  matchField2: string = "",
  joinKeys: string[] = []
): OutPutItemJSON<T>[] => {
  if (!json1?.length || !json2?.length) return [];

  return json1.map((entry) => {
    const matchsFound = json2?.filter(
      (item) => item[matchField2] === entry[matchField1]
    );

    const joinKeysMatch: any = {};
    let iteraror = 1;
    for (const matchFound of matchsFound) {
      for (const key of joinKeys) {
        if (matchFound[key] === null || matchFound[key] === undefined) continue;
        joinKeysMatch[`${key}-${iteraror}`] = matchFound[key];
      }
      iteraror++;
    }

    return {
      ...entry,
      ...joinKeysMatch,
      quantityMatch: matchsFound.length,
      match: matchsFound.length > 0,
    } as unknown as OutPutItemJSON<T>;
  });
};

export const convertToOtherCashbackFormat = <T>(
  ruts: OutPutItemJSON[] | null = [],
  date: Date | undefined,
  monto: string,
  tituloOferta: string,
  idOferta: string,
  estadoOferta: string
): OutPutItemJSON<T>[] => {
  if (!ruts?.length) throw new Error("No hay ruts");

  const montoNumber = Number.parseFloat(monto);
  if (montoNumber <= 0) throw new Error("Monto invalido");

  if (!date) throw new Error("Fecha invalida");
  const dateFormat = format(date, FormatDate, { locale: es });

  const tituloOfertaString = tituloOferta.trim();
  if (!tituloOfertaString || tituloOfertaString.length <= 0)
    throw new Error("Titulo invalido");

  const idOfertaString = idOferta.trim();
  if (!idOfertaString || idOfertaString.length <= 0)
    throw new Error("Id invalido");

  const estadoOfertaString = estadoOferta.trim();
  if (!estadoOfertaString || estadoOfertaString.length <= 0)
    throw new Error("Estado invalido");

  // paso 1 validar que todos los ruts son validos
  const haveInvalidRut =
    ruts.filter((item) => !isRutValid(String(item.rut))).length > 0;
  if (haveInvalidRut) throw new Error("Rut invalido");

  return ruts?.map((item) => {
    const [rutCliente, dv] = extractRut(String(item.rut));
    const fechaTransaccion = dateFormat;
    const montoCashback = montoNumber;
    const titulo = tituloOfertaString;
    const idOferta = idOfertaString;
    const idTransaccion = uuidv4();
    const estado = estadoOfertaString;

    return {
      rutCliente,
      dv,
      fechaTransaccion,
      montoCashback,
      titulo,
      idOferta,
      idTransaccion,
      estado,
    } as unknown as OutPutItemJSON<T>;
  });
};

export const getMaxKeysItem = (data: any[]) => {
  if (!data?.length) return [];

  return data.reduce<string[]>((acc, item) => {
    const keys = Object.keys(item);
    const keysUnique = new Set([...acc, ...keys]);
    return Array.from(keysUnique);
  }, []);
};

export const convertToCSV = (data: OutPutItemJSON[]) => {
  if (data?.length === 0) return "";

  const headers = getMaxKeysItem(data);

  const csvRows = data.map((row) =>
    headers
      .map((header) => {
        const value = row[header];
        return value === undefined || value === null ? "N/A" : value;
      })
      .join(",")
  );

  return [headers.join(","), ...csvRows].join("\n");
};

export const convertToSSV = (data: OutPutItemJSON[]) => {
  if (data?.length === 0) return "";

  const headers = getMaxKeysItem(data);

  const csvRows = data.map((row) =>
    headers
      .map((header) => {
        const value = row[header];
        return value === undefined || value === null ? "N/A" : value;
      })
      .join(";")
  );

  return [headers.join(";"), ...csvRows].join("\n");
};

export const convertToFormat = <T>(
  data: OutPutItemJSON<T>[] | null,
  format: string
) => {
  if (!data?.length) return "";
  if (format === "csv") return convertToCSV(data);
  if (format === "ssv") return convertToSSV(data);
  return JSON.stringify(data, null, 2);
};

export const convertToCustomCSV = (
  data: OutPutItemJSON[] | null,
  matchField: string
) => {
  if (!data?.length) return "";

  const csvRows = data
    .filter((row) => row[matchField] !== undefined && row[matchField] !== null)
    .map((row) => `'${row[matchField]}',`);

  if (!csvRows.length || csvRows?.length <= 0) return "";

  const csvRowsWithData = csvRows.join("\n");
  const result = csvRowsWithData.substring(0, csvRowsWithData.length - 1);

  return `${result}`;
};

export const parseStringToJson = (input: string): OutPutItemJSON[] | null => {
  input = input.trim();

  // Intentar parsear como JSON directamente
  try {
    return JSON.parse(input);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log("No es JSON, probando CSV...");
  }

  // Detectar si es CSV con comas o tabulación
  const isTabSeparated = input.includes("\t");
  const delimiter = isTabSeparated ? "\t" : ",";

  // Convertir CSV a JSON
  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
  if (lines.length < 2) return null; // No tiene suficientes líneas para ser CSV válido

  const headers = lines[0].split(delimiter).map((header) => header.trim());
  const data = lines.slice(1).map((line) => {
    const values = line.split(delimiter).map((value) => value.trim());
    const obj: Record<string, string> = {};

    headers.forEach((header, index) => {
      obj[header] = values[index] || "";
    });

    return obj;
  });

  return data;
};

export const markDuplicates = <T>(
  data: OutPutItemJSON[] | null,
  field: string
): OutPutItemJSON<T>[] => {
  if (!data?.length) return [];

  return data?.map((movimiento) => {
    const fieldMovimiento = movimiento[field];
    const duplicate =
      data?.filter((movimiento) => movimiento[field] === fieldMovimiento)
        .length > 1;

    return {
      ...movimiento,
      duplicate,
    } as unknown as OutPutItemJSON<T>;
  });
};

export const formatCurrencyLocale = (value: number) => {
  return new Intl.NumberFormat("es-cl", {
    style: "currency",
    currency: "CLP",
  }).format(value);
};

export const calculateUniqueData = (data: any[], field: string) => {
  const itemsUniques = new Set(data.map((item) => item[field]));
  return Array.from(itemsUniques).length;
};

export const calculateLastState = <T>(
  data: OutPutItemJSON<T>[] | null
): OutPutItemJSON<ComplexDuplicateOutput>[] => {
  if (!data?.length) return [];

  return data?.map((item) => {
    if (!Array.isArray(item.movimientos))
      throw new Error("El campo 'movimientos' no es un array");

    const itemLength = item?.movimientos?.length || 0;
    const ultimoMovimiento = item.movimientos[itemLength - 1];

    delete item?.movimientos;

    if (typeof ultimoMovimiento !== "object" || !ultimoMovimiento?.estado)
      throw new Error("El campo 'estado' no existe en el movimiento");

    return {
      ...item,
      estado: ultimoMovimiento?.estado,
      eliminar: false,
      reglaEliminacion: "NO-APLICA",
    } as unknown as OutPutItemJSON<ComplexDuplicateOutput>;
  });
};

export const groupByField = (data: any[] | null | undefined, field: string) => {
  return data?.reduce((acumulador, movimiento) => {
    const campo = movimiento[field];

    // Si no existe la key en el acumulador, la inicializamos como array
    if (!acumulador[campo]) {
      acumulador[campo] = [];
    }

    // Agregamos el movimiento al array correspondiente a su identificador
    acumulador[campo].push(movimiento);

    return acumulador;
  }, {});
};

type Regla = (mov1: Record<string, any>, mov2: Record<string, any>) => void;

const REGLAS: Record<string, Regla> = {
  "RECHAZADO-PENDIENTE": (
    mov1: Record<string, any>,
    mov2: Record<string, any>
  ) => {
    if (mov1.estado === "PENDIENTE") {
      mov1.eliminar = true;
      mov2.eliminar = false;
    } else {
      mov2.eliminar = true;
      mov1.eliminar = false;
    }

    mov1.reglaEliminacion = "RECHAZADO-PENDIENTE";
    mov2.reglaEliminacion = "RECHAZADO-PENDIENTE";
  },
  "ABONADO-PENDIENTE": (
    mov1: Record<string, any>,
    mov2: Record<string, any>
  ) => {
    if (mov1.estado === "PENDIENTE") {
      mov1.eliminar = true;
      mov2.eliminar = false;
    } else {
      mov2.eliminar = true;
      mov1.eliminar = false;
    }

    mov1.reglaEliminacion = "ABONADO-PENDIENTE";
    mov2.reglaEliminacion = "ABONADO-PENDIENTE";
  },
  "RECHAZADO-RECHAZADO": (
    mov1: Record<string, any>,
    mov2: Record<string, any>
  ) => {
    if (mov1.notificacion === false && mov2.notificacion !== false) {
      mov1.eliminar = true;
      mov2.eliminar = false;
    } else if (mov2.notificacion === false && mov1.notificacion !== false) {
      mov2.eliminar = true;
      mov1.eliminar = false;
    } else {
      mov1.eliminar = false;
      mov2.eliminar = true;
    }

    mov1.reglaEliminacion = "RECHAZADO-RECHAZADO";
    mov2.reglaEliminacion = "RECHAZADO-RECHAZADO";
  },
  "PENDIENTE-PENDIENTE": (
    mov1: Record<string, any>,
    mov2: Record<string, any>
  ) => {
    if (mov1.notificacion === false && mov2.notificacion !== false) {
      mov1.eliminar = true;
      mov2.eliminar = false;
    } else if (mov2.notificacion === false && mov1.notificacion !== false) {
      mov2.eliminar = true;
      mov1.eliminar = false;
    } else {
      mov1.eliminar = false;
      mov2.eliminar = true;
    }

    mov1.reglaEliminacion = "PENDIENTE-PENDIENTE";
    mov2.reglaEliminacion = "PENDIENTE-PENDIENTE";
  },
};

const applyRuleMovementDuplicate = (
  mov1: Record<string, any>,
  mov2: Record<string, any>
) => {
  const key = `${mov1.estado}-${mov2.estado}`;
  const reverseKey = `${mov2.estado}-${mov1.estado}`;
  if (REGLAS[key]) {
    REGLAS[key](mov1, mov2);
  } else if (REGLAS[reverseKey]) {
    REGLAS[reverseKey](mov1, mov2);
  } else {
    mov1.eliminar = false;
    mov2.eliminar = false;
    mov1.reglaEliminacion = "NO-CONOCIDA";
    mov2.reglaEliminacion = "NO-CONOCIDA";
  }
};

const manageDuplicateMovements = (movements: Record<string, any[]> | null) => {
  if (!movements) return [];

  Object.keys(movements).forEach((key) => {
    const grupo = movements[key];

    if (grupo.length === 2) {
      const [mov1, mov2] = grupo;
      applyRuleMovementDuplicate(mov1, mov2);
    } else {
      grupo.forEach((mov) => (mov.eliminar = false));
    }
  });

  return Object.values(movements).flat();
};

export const markComplexDuplicates = <T>(
  data: OutPutItemJSON[] | null,
  field: string
): OutPutItemJSON<T>[] => {
  try {
    if (!data?.length) return [];
    const dataDuplicate = markDuplicates(data, field);
    const dataWithLastState = calculateLastState(dataDuplicate);
    const dataGrouped = groupByField(dataWithLastState, field);
    return manageDuplicateMovements(dataGrouped);
  } catch (error) {
    console.error("Error al marcar duplicados complejos", error);
    return [];
  }
};
