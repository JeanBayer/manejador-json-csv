/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleWithdrawal = (retiros: any[] | null) => {
  if (!retiros) throw new Error("No data found");
  return retiros?.map(
    ({
      id = null,
      rut = null,
      fechaHoraRegistro = null,
      email = null,
      cantidadTransacciones = null,
      montoTotalCashback = null,
      cuentaAbono = null,
      origenCuenta = null,
      estadoRetiro = null,
      transacciones = [],
    }) => {
      const { PENDIENTE, PENDIENTE_PAGO, ABONADO, RECHAZADO, ERROR_PAGO } =
        groupIdentifiersByStatus(transacciones);

      const recalculatedWithdrawalStatus =
        recalculateWithdrawalStatus(transacciones);

      return {
        id,
        rut,
        fechaHoraRegistro,
        email,
        cantidadTransacciones,
        cantidadTransaccionesRecalculado: transacciones?.length,
        coincidenCantidadTransacciones:
          cantidadTransacciones === transacciones?.length,
        montoTotalCashback: montoTotalCashback,
        cuentaAbono: cuentaAbono,
        origenCuenta: origenCuenta,
        estadoRetiro: estadoRetiro,
        estadoRetiroRecalculado: recalculatedWithdrawalStatus,
        coincidenEstados: estadoRetiro === recalculatedWithdrawalStatus,
        transaccionesPendienteQuantity: PENDIENTE?.length,
        transaccionesPendiente: formatIdentifiers(PENDIENTE),
        transaccionesPendientePagoQuantity: PENDIENTE_PAGO.length,
        transaccionesPendientePago: formatIdentifiers(PENDIENTE_PAGO),
        transaccionesAbonadoQuantity: ABONADO.length,
        transaccionesAbonado: formatIdentifiers(ABONADO),
        transaccionesRechazadoQuantity: RECHAZADO.length,
        transaccionesRechazado: formatIdentifiers(RECHAZADO),
        transaccionesErrorPagoQuantity: ERROR_PAGO.length,
        transaccionesErrorPago: formatIdentifiers(ERROR_PAGO),
      };
    }
  );
};

const groupIdentifiersByStatus = (transacciones: any[]) =>
  transacciones?.reduce(
    (
      acc: { [x: string]: any[] },
      t: { estado: string | number; identificador: any }
    ) => {
      acc[t.estado] = acc[t.estado] || [];
      acc[t.estado].push(t.identificador);
      return acc;
    },
    {
      PENDIENTE: [],
      PENDIENTE_PAGO: [],
      ABONADO: [],
      RECHAZADO: [],
      ERROR_PAGO: [],
    }
  );

const formatIdentifiers = (transacciones: any[]) => {
  if (!transacciones?.length) return "N/A";
  return `'${transacciones.join("'*'")}'`;
};

const recalculateWithdrawalStatus = (transacciones: any[]): string => {
  const estados = transacciones.map((t) => t.estado);
  const allAbonado = estados.every((estado) => estado === "ABONADO");
  if (allAbonado) return "ABONADO";

  const hasErrorPagoOrRechazado = estados.some(
    (estado) => estado === "ERROR_PAGO" || estado === "RECHAZADO"
  );
  if (hasErrorPagoOrRechazado) return "EN_REVISION";

  return "EN_PROCESO";
};
