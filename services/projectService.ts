import { connectToDatabase } from "@/lib/db";
import Project, { IProject } from "@/models/Project";

export class ProjectService {
  static async getAllProjects(filter: Record<string, any> = {}) {
    await connectToDatabase();
    return Project.find(filter).sort({ order: 1, createdAt: -1 }).lean();
  }

  static async getProjectById(id: string) {
    await connectToDatabase();
    return Project.findById(id).lean();
  }

  static async createProject(data: Partial<IProject>) {
    await connectToDatabase();
    const project = new Project(data);
    return project.save();
  }

  static async updateProject(id: string, data: Partial<IProject>) {
    await connectToDatabase();
    return Project.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
  }

  static async deleteProject(id: string) {
    await connectToDatabase();
    return Project.findByIdAndDelete(id).lean();
  }
}
