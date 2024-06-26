import { toast } from "react-hot-toast";

export default async function ServiceHandler(response) {
  const spinner = document.getElementById("spinner");
  if (navigator.onLine && !!spinner) {
    spinner.style.display = "grid";
  }
  return await response
    .then((res) => {
      const { method, url } = res.config;
      const { data, status } = res;
      if (!!spinner) {
        spinner.style.display = "none";
      }
      return data;
    })
    .catch(
      ({
        response: {
          data: { error },
        },
      }) => {
        toast.error(error);
        if (!!spinner) {
          spinner.style.display = "none";
        }
        return error;
      }
    );
}
