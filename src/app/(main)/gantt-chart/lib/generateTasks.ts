import type { Task, TaskDependency } from "@jaeungkim/gantt-chart";
import sampleTasksData from "../data/sampleTasks.json";

interface TaskTemplate {
  id: string;
  name: string;
  startOffset: number;
  endOffset: number;
  parentId: string | null;
  sequence: string;
  dependencies: TaskDependency[];
}

const DEMO_START_DATE = Date.UTC(2026, 0, 5, 9, 0, 0, 0);

function getDateWithOffset(offsetDays: number, isEnd: boolean): string {
  const date = new Date(DEMO_START_DATE);
  date.setUTCDate(date.getUTCDate() + offsetDays);
  date.setUTCHours(isEnd ? 17 : 9, 0, 0, 0);

  return date.toISOString();
}

export function generateSampleTasks(): Task[] {
  return (sampleTasksData as TaskTemplate[]).map((template) => ({
    id: template.id,
    name: template.name,
    startDate: getDateWithOffset(template.startOffset, false),
    endDate: getDateWithOffset(template.endOffset, true),
    parentId: template.parentId,
    sequence: template.sequence,
    dependencies: template.dependencies,
  }));
}
