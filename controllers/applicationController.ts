import { Request, Response } from "express";
import AppError from "../utils/AppError.js";
import { applyToJobService, getMyApplicationsService, getJobApplicationsService, updateApplicationStatusService } from "../services/applicationService.js";

export async function applyToJob(
  req: Request,
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
  req: Request,
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
  req: Request,
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
  req: Request,
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