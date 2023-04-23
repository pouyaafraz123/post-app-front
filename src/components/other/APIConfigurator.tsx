import { AxiosError, AxiosInstance } from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import apiCaller, { IServerResponse } from "../../api";

interface IAPIConfiguratorProps {
  axiosInstance?: AxiosInstance;
  onError?: (message: string) => void;
}

export function APIConfigurator({
  axiosInstance = apiCaller,
  onError = (error) => toast.error(error),
}: IAPIConfiguratorProps) {
  const { logout } = useAuth();
  const history = useNavigate();

  const errorHandler = async (error: AxiosError<IServerResponse<any>>) => {
    if (!error.response) {
      if (error.code !== "ERR_CANCELED") {
        // "ERR_CANCELED" happened if the file query or mutation has been canceled.
        // in this case we don't want to show an error message.
        onError("Unable to get server response. Please check your connection.");
      }
      return Promise.reject(error);
    }
    /* console.log(error?.response?.data?.detail);
    if (error?.response?.data?.detail) {
      toast.error(error?.response?.data?.detail);
      return Promise.reject(error);
    }*/

    switch (error.response.status) {
      case 401:
        logout();
        onError("Your session has been expired. Please login again.");
        break;

      case 403:
        onError("Access Denied");
        history(-1);
        break;

      case 422:
        onError("Unprocessable Entity");
        break;

      default:
        onError(error.response.data.detail ?? "Something went wrong");
    }

    return Promise.reject(error);
  };

  useEffect(() => {
    axiosInstance.interceptors.response.use(undefined, errorHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
