import dayjs from "dayjs";

export const formatTime = (dateString?: string | number) => {
  if (!dateString) return "";
  return dayjs(dateString).format("HH:mm");
};

export const formatDate = (dateString?: string | number) => {
  return dayjs(dateString).format("DD MMM YYYY");
};
