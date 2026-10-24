export const ORDER_STATUSES = [
  "Pending",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

// Bootstrap badge colors
export const statusBadgeClass = (status) => {
  switch (status) {
    case "Pending":
      return "bg-warning text-dark";
    case "Shipped":
      return "bg-info text-dark";
    case "Out for Delivery":
      return "bg-primary";
    case "Delivered":
      return "bg-success";
    case "Cancelled":
      return "bg-danger";
    default:
      return "bg-secondary";
  }
};
