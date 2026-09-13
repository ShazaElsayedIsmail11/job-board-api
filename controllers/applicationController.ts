import {  Response } from "express";
import AppError from "../utils/AppError.js";
import { applyToJobService, getMyApplicationsService, getJobApplicationsService, updateApplicationStatusService } from "../services/applicationService.js";
import type { AuthRequest } from "../types/AuthRequest.js";
export async function applyToJob(
  req: AuthRequest,
  res: Response
) {
  const jobId = Number(req.params.id);

  if (Number.isNaN(jobId)) {
    throw new AppError("Invalid job id", 400);
  }

  const application = await applyToJobService(
    req.user!.id,
    jobId
  );

  return res.status(201).json({
    message: "Application submitted successfully",
    data: application,
  });
}
export async function getMyApplications(
  req: AuthRequest,
  res: Response
) {
  const applications = await getMyApplicationsService(
    req.user!.id
  );

  return res.status(200).json({
    data: applications,
  });
}
export async function getJobApplications(
  req: AuthRequest,
  res: Response
) {
  const jobId = Number(req.params.id);

  if (Number.isNaN(jobId)) {
    throw new AppError("Invalid job id", 400);
  }

  const applications = await getJobApplicationsService(
    jobId,
    req.user!.id
  );

  return res.status(200).json({
    data: applications,
  });
}
export async function updateApplicationStatus(
  req: AuthRequest,
  res: Response
) {
  const applicationId = Number(req.params.id);

  if (Number.isNaN(applicationId)) {
    throw new AppError("Invalid application id", 400);
  }

  const application = await updateApplicationStatusService(
    applicationId,
    req.user!.id,
    req.body.status
  );

  return res.status(200).json({
    message: "Application status updated successfully",
    data: application,
  });
}