"use client";

import { useEffect, useState } from "react";
import { StudentProfile } from "@/types";
import { getAuthSession, updateAuthMetadata } from "@/lib/auth";

export const STORAGE_KEY = "scout:profile";

export const BLANK_PROFILE: StudentProfile = {
  displayName: "",
  grade: null,
  state: null,
  country: "United States",
  gpa: null,
  academicInterests: [],
  careerInterests: [],
  preferredCategories: [],
  preferredLocation: null,
  remotePreference: "NO_PREFERENCE",
  hasPriorExperience: false,
};

function isProfile(value: unknown): value is StudentProfile {
  if (!value || typeof value !== "object") return false;
  const p = value as Partial<StudentProfile>;
  return (
    typeof p.displayName === "string" &&
    (p.grade === null || typeof p.grade === "number") &&
    Array.isArray(p.academicInterests) &&
    Array.isArray(p.careerInterests) &&
    Array.isArray(p.preferredCategories)
  );
}

export function useProfile() {
  const [profile, setProfileState] = useState<StudentProfile>(BLANK_PROFILE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const session = getAuthSession();
      const remoteProfile = session?.user.user_metadata?.scoutProfile;
      if (isProfile(remoteProfile)) {
        setProfileState(remoteProfile);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteProfile));
      } else {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const localProfile = JSON.parse(raw);
          if (isProfile(localProfile)) setProfileState(localProfile);
        }
      }
    } finally {
      setLoaded(true);
    }
  }, []);

  function setProfile(next: StudentProfile) {
    setProfileState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }

    // When signed in, also attach the profile to the authenticated account.
    void updateAuthMetadata({ displayName: next.displayName, scoutProfile: next });
  }

  return { profile, setProfile, loaded };
}
