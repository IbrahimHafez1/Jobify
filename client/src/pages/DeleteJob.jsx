import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ params }) => {
  try {
    const { data: job } = await customFetch.delete(`/jobs/${params.id}`);
    if (job) {
      toast.success("Job deleted successfully");
      return redirect("/dashboard/all-jobs");
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};

const DeleteJob = () => {
  return <div>Delete Job</div>;
};

export default DeleteJob;
