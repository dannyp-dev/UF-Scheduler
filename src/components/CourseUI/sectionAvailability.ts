import { Section } from "./CourseTypes";

export const isFullyOnline = (section: Section): boolean =>
  section.sectWeb === "AD";

export const hasKnownSchedule = (section: Section): boolean =>
  Boolean(section.meetTimes?.length) || isFullyOnline(section);

export const hasUnavailableTimes = (section: Section): boolean =>
  !hasKnownSchedule(section);
