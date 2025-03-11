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
      // const transaccionPorEstado = retiro?.transacciones?.reduce((acc, t) => {
      //   acc[t.estado] = acc[t.estado] || [];
      //   acc[t.estado].push(t.identificador);
      //   return acc;
      // }, {});

      const transaccionesPendiente = transacciones?.filter(
        (item: { estado: string }) => item?.estado === "PENDIENTE"
      );
      const transaccionesPendientePago = transacciones?.filter(
        (item: { estado: string }) => item?.estado === "PENDIENTE_PAGO"
      );
      const transaccionesAbonado = transacciones?.filter(
        (item: { estado: string }) => item?.estado === "ABONADO"
      );
      const transaccionesRechazado = transacciones?.filter(
        (item: { estado: string }) => item?.estado === "RECHAZADO"
      );
      const transaccionesErrorPago = transacciones?.filter(
        (item: { estado: string }) => item?.estado === "ERROR_PAGO"
      );

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
        estadoRetiroRecalculado: estadoRetiro,
        coincidenEstados: estadoRetiro === recalculatedWithdrawalStatus,
        transaccionesPendienteQuantity: transaccionesPendiente?.length,
        transaccionesPendiente: groupIdentifiersByStatus(
          transaccionesPendiente
        ),
        transaccionesPendientePagoQuantity: transaccionesPendientePago.length,
        transaccionesPendientePago: groupIdentifiersByStatus(
          transaccionesPendientePago
        ),
        transaccionesAbonadoQuantity: transaccionesAbonado.length,
        transaccionesAbonado: groupIdentifiersByStatus(transaccionesAbonado),
        transaccionesRechazadoQuantity: transaccionesRechazado.length,
        transaccionesRechazado: groupIdentifiersByStatus(
          transaccionesRechazado
        ),
        transaccionesErrorPagoQuantity: transaccionesErrorPago.length,
        transaccionesErrorPago: groupIdentifiersByStatus(
          transaccionesErrorPago
        ),
      };
    }
  );
};

const groupIdentifiersByStatus = (transacciones: any[]) => {
  if (!transacciones?.length) return "N/A";
  return `'${transacciones?.map((item) => item?.identificador).join("'*'")}'`;
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
