import { notification } from "antd";

notification.config({
  placement: "bottomLeft",
});

export const alert = ({ message, description = "", type = "success" }) => {
  notification[type]({
    message,
    description,
  });
};
