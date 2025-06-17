import { useState, useEffect } from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface FormData {
  fullname: string;
  gender: string;
  dateOfBirth: string;
  primaryEmail: string;
  profession: string;
  specialization: string;
  location: string;
  bio: string;
  skills: string[];
  linkedIn?: string;
  github?: string;
  phoneNumber: string;
}

interface SkillsFormProps {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>; // Add watch to sync with form state
}

export default function SkillsForm({
  register,
  setValue,
  watch,
}: SkillsFormProps) {
  const [inputValue, setInputValue] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  // Watch the skills field to sync with parent form
  const watchedSkills = watch("skills");

  // Initialize skills from form data if it exists
  useEffect(() => {
    if (watchedSkills && !arraysEqual(watchedSkills, skills)) {
      setSkills(watchedSkills);
    }
  }, [watchedSkills, skills]);

  const addSkill = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !skills.includes(trimmed)) {
      const updated = [...skills, trimmed];
      setSkills(updated);
      setValue("skills", updated, { shouldValidate: true, shouldDirty: true });
      setInputValue("");
    }
  };

  const removeSkill = (skill: string) => {
    const updated = skills.filter((s) => s !== skill);
    setSkills(updated);
    setValue("skills", updated, { shouldValidate: true, shouldDirty: true });
  };

  // Helper function to compare arrays
  const arraysEqual = (a: string[], b: string[]) => {
    if (a.length !== b.length) return false;
    return a.every((val, index) => val === b[index]);
  };

  return (
    <div className="space-y-4">
      {/* Register the hidden input properly */}
      <input
        type="hidden"
        {...register("skills", {
          value: skills,
        })}
      />

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          placeholder="Enter a skill"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill();
            }
          }}
        />
        <button
          type="button"
          onClick={addSkill}
          disabled={!inputValue.trim()}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill}
            className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full flex items-center gap-2 animate-fadeIn"
          >
            <span className="text-sm font-medium">{skill}</span>
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="text-sm font-bold hover:text-red-500 w-5 h-5 flex items-center justify-center rounded-full hover:bg-red-100 transition-colors"
              aria-label={`Remove ${skill}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <p className="text-gray-500 text-sm italic">
          No skills added yet. Start typing to add your first skill!
        </p>
      )}
    </div>
  );
}
