import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";

export async function applyToJobService(
  seekerId: number,
  jobId: number
) {
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  if (!job) {
    throw new AppError("Job not found", 404);
  }

  const existingApplication =
    await prisma.application.findUnique({
      where: {
        seekerId_jobId: {
          seekerId,
          jobId,
        },
      },
    });

  if (existingApplication) {
    throw new AppError(
      "You already applied to this job",
      409
    );
  }

  return prisma.application.create({
    data: {
      seekerId,
      jobId,
    },
  });
}
export async function getMyApplicationsService(
  seekerId: number
) {
  return prisma.application.findMany({
    where: {
      seekerId,
    },
    include: {
      job: true,
    },
    orderBy: {
      appliedAt: "desc",
    },
  });
}
export async function getJobApplicationsService(
  jobId: number,
  employerId: number
) {
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  if (!job) {
    throw new AppError("Job not found", 404);
  }

  if (job.employerId !== employerId) {
    throw new AppError(
      "You are not allowed to view applications for this job",
      403
    );
  }

  return prisma.application.findMany({
    where: {
      jobId,
    },
    include: {
      seeker: {
        select: {
          id: true,
          name: true,
          email: true,
          seekerProfile: true,
        },
      },
    },
    orderBy: {
      appliedAt: "desc",
    },
  });
}
export async function updateApplicationStatusService(
  applicationId: number,
  employerId: number,
  status: "ACCEPTED" | "REJECTED"
) {
  const application = await prisma.application.findUnique({
    where: {
      id: applicationId,
    },
    include: {
      job: true,
    },
  });

  if (!application) {
    throw new AppError("Application not found", 404);
  }

  if (application.job.employerId !== employerId) {
    throw new AppError(
      "You are not allowed to update this application",
      403
    );
  }

  return prisma.application.update({
    where: {
      id: applicationId,
    },
    data: {
      status,
    },
  });
}