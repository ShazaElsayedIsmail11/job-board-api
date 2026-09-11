import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";
import type { Prisma } from "../generated/prisma/client.js";
type CreateJobData = {
  title: string;
  description: string;
};
type UpdateJobData = {
  title?: string;
  description?: string;
};
type GetJobsOptions = {
  page: number;
  limit: number;
  search?: string;
  employerId?: number;
};
export async function createJobService(
  data: CreateJobData,
  employerId: number
) {
  const job = await prisma.job.create({
    data: {
      title: data.title,
      description: data.description,
      employerId: employerId,
    },
  });

  return job;
}
export async function getAllJobsService(
  options: GetJobsOptions
) {
  const {
    page,
    limit,
    search,
    employerId,
  } = options;

  const where: Prisma.JobWhereInput = {};

  if (search) {
    where.OR = [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  if (employerId) {
    where.employerId = employerId;
  }

  const skip = (page - 1) * limit;

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        publishedAt: "desc",
      },
    }),

    prisma.job.count({
      where,
    }),
  ]);

  return {
    jobs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
export async function getJobByIdService(id:number){
    const job=await prisma.job.findUnique({
        where:{
            id
        }
    })
    if(!job){
        throw new AppError("this job is not available",404)
    }
    return job
}
export async function updateJobService(jobId:number, userId:number,  data: UpdateJobData){
const job=await prisma.job.findUnique({
    where:{
        id:jobId
    }
})
 if (!job) {
    throw new AppError("Job not found", 404);
  }
 if (job.employerId !== userId) {
    throw new AppError(
      "You are not allowed to update this job",
      403
    );
  }

  const updatedJob = await prisma.job.update({
    where: {
      id: jobId,
    },
    data
  });

  return updatedJob;
}
export async function deleteJobService(
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
      "You are not allowed to delete this job",
      403
    );
  }

  await prisma.job.delete({
    where: {
      id: jobId,
    },
  });
}