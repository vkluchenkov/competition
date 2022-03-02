import React from "react";
import { styles } from "./styles";
import { Chip } from "./Chip";
import { VideoCategory } from "../../models/videoCategories";

interface ChipsProps {
  activeCategory: VideoCategory | null;
  onChange: (category: VideoCategory | null) => void;
}

export const Chips: React.FC<ChipsProps> = ({ activeCategory, onChange }) => {
  const categories = [
    {
      label: "All",
      category: null,
    },
    {
      label: "Show",
      category: VideoCategory.Show,
    },
    {
      label: "Comedy",
      category: VideoCategory.Comedy,
    },
  ];

  return (
    <ul css={styles.chips_container}>
      {categories.map((cat) => {
        return (
          <Chip
            label={cat.label}
            active={cat.category === activeCategory}
            onClick={() => onChange(cat.category)}
          />
        );
      })}
    </ul>
  );
};
