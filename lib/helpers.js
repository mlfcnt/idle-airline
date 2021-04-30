import { notification } from "antd";
import jwt from "jsonwebtoken";
import { eOptions, JWT_TOKEN } from "./constants";

notification.config({
  placement: "bottomLeft",
});

export const alert = ({ message, description = "", type = "success" }) => {
  const save = localStorage.getItem("idle-airline-save");
  const { [eOptions.NOTIFICATIONS]: userWantsNotifications } = jwt.verify(
    save,
    JWT_TOKEN
  );
  if (!userWantsNotifications) return null;
  notification[type]({
    message,
    description,
  });
};
