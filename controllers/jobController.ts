import {  Response } from "express";
import { createJobService, getAllJobsService, getJobByIdService, updateJobService, deleteJobService } from "../services/jobService.js";
import AppError from "../utils/AppError.js";
import type { AuthRequest } from "../types/AuthRequest.js";
export async function createJob(req: AuthRequest, res: Response) {
  const job = await createJobService(
    req.body,
    req.user!.id
  );

  return res.status(201).json({
    message: "Job created successfully",
    data: job,
  });
}
export async function getAllJobs(req: AuthRequest, res: Response) {
    const page=Number(req.query.page) || 1;
    const limit=Number(req.query.limit) || 10;
    const search= typeof req.query.search === "string"
      ? req.query.search : undefined;
   const employerId = req.query.employerId
    ? Number(req.query.employerId)
    : undefined;
     if (page < 1 || limit < 1) {
    throw new AppError("Page and limit must be positive numbers", 400);
  }

  if (req.query.employerId && Number.isNaN(employerId)) {
    throw new AppError("Invalid employer id", 400);
  }
  const result= await getAllJobsService({
    page,
    limit,
    search,
    employerId,
  });
  return res.status(200).json({
    data: result.jobs,
    pagination: result.pagination
  })
}
export async function getJobById(req: AuthRequest, res:Response){
const jobId = Number(req.params.id);

  if (Number.isNaN(jobId)) {
    throw new AppError("Invalid job id", 400);
  }

  const job = await getJobByIdService(jobId);
}
export async function updateJob(req:AuthRequest, res:Response){
   const jobId = Number(req.params.id);

  if (Number.isNaN(jobId)) {
    throw new AppError("Invalid job id", 400);
  }
const userId=req.user!.id
const job= await updateJobService(jobId,userId, req.body)
  return res.status(200).json({
    message: "Job updated successfully",
    data: job,
  });
}
export async function deleteJob(req: AuthRequest, res: Response) {
  const jobId = Number(req.params.id);

  if (Number.isNaN(jobId)) {
    throw new AppError("Invalid job id", 400);
  }

  await deleteJobService(
    jobId,
    req.user!.id
  );

  return res.status(200).json({
    message: "Job deleted successfully",
  });
}