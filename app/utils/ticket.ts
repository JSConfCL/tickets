import { PurchaseOrderPaymentStatusEnum } from "~/api/gql/graphql";

export const idReference = (id: string) => id.split("-")[4];

export const approvalStatusLabel = (status: string) =>
  ({
    approved: "aprobado",
    cancelled: "cancelado",
    not_required: "no requerido",
    pending: "pendiente",
    rejected: "rechazado",
  })[status] ?? "";

export const paymentStatusLabel = (status: string) =>
  ({
    not_required: "no requerido",
    paid: "pagado",
    unpaid: "no pagado",
  })[status] ?? "";

export const redemptionStatusLabel = (status: string) =>
  ({
    pending: "por reclamar",
    redeemed: "reclamado",
  })[status] ?? "";

export const approvalStatusColor = (status: string) =>
  ({
    approved: "bg-green-400",
    cancelled: "bg-red-400",
    not_required: "bg-green-400",
    pending: "bg-blue-400",
    rejected: "bg-red-400",
  })[status] ?? "bg-gray-400";

export const paymentStatusColor = (status: PurchaseOrderPaymentStatusEnum) =>
  ({
    not_required: "bg-green-400",
    paid: "bg-green-400",
    unpaid: "bg-red-400",
  })[status] ?? "bg-gray-400";

export const redemptionStatusColor = (status: string) =>
  ({
    pending: "bg-green-400",
    redeemed: "bg-yellow-400",
  })[status] ?? "bg-gray-400";
