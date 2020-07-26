import { isServer } from "../../../../utils/functions/isServer";

const LocalStoragePullData = (fieldName) => {
  if (isServer()) {
    return "";
  } else {
    return localStorage.getItem(fieldName)
      ? JSON.parse(localStorage.getItem(fieldName))
      : "";
  }
};

export default LocalStoragePullData;
