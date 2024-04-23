import toast from "react-hot-toast";

export const upload = async (e, callbackFn) => {
    const file = e.target.files?.[0];
    if (file) {
      const data = new FormData();
      data.set("file", file);
      const toastLoading = toast.loading("Uploading...");
      fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        response.json().then((link) => {
          toast.dismiss(toastLoading);
          toast.success("Uploaded");
          callbackFn(link);
        });
      });
    }
  };