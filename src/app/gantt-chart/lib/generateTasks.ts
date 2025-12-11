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

/**
 * 오늘 날짜 기준으로 오프셋을 적용하여 UTC ISO 문자열 생성
 */
function getDateWithOffset(offsetDays: number, isEnd: boolean): string {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);

  // 시작: 09:00 UTC, 종료: 17:00 UTC
  date.setUTCHours(isEnd ? 17 : 9, 0, 0, 0);

  return date.toISOString();
}

/**
 * 템플릿 데이터로부터 오늘 기준 동적 태스크 생성
 */
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

