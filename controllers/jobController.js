import 'express-async-errors'
import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllJobs = async (req, res) => {
    const jobs = await Job.find({});
    res.status(StatusCodes.OK).json({ jobs })
}

export const createJob = async (req, res) => {
    const { company, position } = req.body
    const job = await Job.create({ company, position });

    res.status(StatusCodes.CREATED).json({ job })
}

export const getJob = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);

    res.status(StatusCodes.OK).json({ job });
}

export const updateJob = async (req, res) => {
    const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });

    res.status(StatusCodes.OK).json({ msg: 'job modified', job: updateJob });
}

export const deleteJob = async (req, res) => {
    const { id } = req.params;
    const removedJob = await Job.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({ msg: 'job deleted' });
}
