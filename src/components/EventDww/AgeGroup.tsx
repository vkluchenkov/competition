import React from "react";

export const AgeGroup = (age: number) => {
  if (age <= 8) { return "baby" }
  if (age <= 12) { return "kids" }
  if (age <= 17) { return "juniors" }
  if (age <= 39) { return "adults" }
  if (age > 39) { return "adults" }
  return "WTF?"
}