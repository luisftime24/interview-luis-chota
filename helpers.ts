import { candidates } from "./database";

export const isValidSkills = (skills: any[]) => {
  const messages = [];
  
  if (skills === undefined) {
    messages.push("Skills are required");
    return messages;
  }
  if (!Array.isArray(skills)) {
    messages.push("Skills must be an array");
    return messages;
  }
  if (skills.length === 0) {
    messages.push("Skills cannot be empty");
    return messages;
  }
  if (skills.some(skill => typeof skill !== "string")) {
    messages.push("Skills must be contain only strings");
  }

  return messages;
}

const nameIsValid = (name: any) => {
  const messages = [];
  if (name === undefined) {
    messages.push("Name is required");
    return messages;
  }
  if (typeof name !== "string") {
    messages.push("Name must be a string");
  }
  if (name.length === 0) {
    messages.push("Name cannot be empty");
  }

  return messages;
}

export const validateData = (data: { name: string, skills: [] }) => {
  const errors = [];
  const { name, skills } = data;

  const nameErrors = nameIsValid(name);

  if (nameErrors.length !== 0) {
    errors.push({
      name: nameErrors
    });
  }

  const skillsErrors = isValidSkills(skills);
  if (skillsErrors.length !== 0) {
    errors.push({
      skills: skillsErrors
    });
  }

  return errors;
}

export const bestCandidate = (skills: string[]) => {
  const bestCandidates = candidates.filter(candidate => candidate.skills.some(skill => skills.includes(skill)));
  if (bestCandidates.length !== 0) {
    return bestCandidates.sort((a, b) => b.skills.length - a.skills.length)[0];
  }
  return false;
}