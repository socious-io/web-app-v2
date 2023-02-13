import { get } from "../../../core/http";
import { Job } from "../../organisms/job-list/job-list.types";

export async function getJobOverview(id: string): Promise<Job> {
    return get(`projects/${id}`).then(({ data }) => data);
  }