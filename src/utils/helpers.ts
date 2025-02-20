/* eslint-disable @typescript-eslint/no-explicit-any */
export const matchData = (
  json1: Record<string, unknown>[],
  matchField1: string,
  json2: Record<string, unknown>[],
  matchField2: string
) => {
  return json1.map((entry) => {
    const matchFound = json2.some(
      (item) => item[matchField2] === entry[matchField1]
    );
    return {
      ...entry,
      match: matchFound,
    };
  });
};

export const convertToCSV = (data: Record<string, unknown>[]) => {
  if (data?.length === 0) return "";

  const headers = Object.keys(data[0]);
  const csvRows = data.map((row) =>
    headers.map((header) => row[header]).join(",")
  );

  return [headers.join(","), ...csvRows].join("\n");
};

export const convertToFormat = (
  data: Record<string, unknown>[] | null,
  format: string
) => {
  if (!data?.length) return "";
  if (format === "csv") return convertToCSV(data);
  return JSON.stringify(data, null, 2);
};

export const convertToCustomCSV = (
  data: Record<string, unknown>[] | null,
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

export const parseStringToJson = (
  input: string
): Record<string, string>[] | null => {
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

export const markDuplicates = (data: any[] | null, field: string) => {
  if (!data?.length) return [];

  const fieldCounts = data.reduce((acc, item) => {
    const fieldValue = item[field];
    if (fieldValue) {
      acc[fieldValue] = (acc[fieldValue] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return data.map((item) => ({
    ...item,
    duplicate: fieldCounts[item[field]] > 1,
  }));
};

export const calculateLastState = (data: any[] | null) => {
  return data?.map((item) => {
    console.log(item);
    // Obtener el último movimiento
    const ultimoMovimiento = item.movimientos[item.movimientos.length - 1];

    delete item?.movimientos;

    // Retornar el identificador y el estado del último movimiento
    return {
      ...item,
      estado: ultimoMovimiento?.estado,
      eliminar: false,
      reglaEliminacion: "NO-APLICA",
    };
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

export const markComplexDuplicates = (data: any[] | null, field: string) => {
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
