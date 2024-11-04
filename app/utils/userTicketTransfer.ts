export const idReference = (id: string) => id.split("-")[4];

export const statusLabel = (baseStatus: string) => {
  const status = baseStatus.toLowerCase();

  return (
    {
      pending: "Pendiente",
      accepted: "Aceptado",
      rejected: "Rechazado",
      cancelled: "Cancelado",
      expired: "Expirado",
    }[status] ?? ""
  );
};

export const statusColor = (baseStatus: string) => {
  const status = baseStatus.toLowerCase();

  return (
    {
      pending: "bg-blue-400",
      accepted: "bg-green-400",
      rejected: "bg-red-400",
      cancelled: "bg-red-400",
      expired: "bg-red-400",
    }[status] ?? "bg-gray-400"
  );
};
