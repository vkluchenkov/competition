/** @jsxImportSource @emotion/react */
// import React, { useState } from "react";
// import { VideoGrid } from "../../components/VideoGrid";
// import { Chips } from "../../components/Chips";
import { styles } from "./styles";
// import { VideoCategory } from "../../models/videoCategories";
import { Signup } from "../SignUp";

export const Main = () => {
  // const [activeCategory, setActiveCategory] = useState<VideoCategory | null>(
  //   null
  // );

  return (
    <section css={styles.section}>
      <Signup />
      {/* <Chips activeCategory={activeCategory} onChange={setActiveCategory} />
      <VideoGrid activeCategory={activeCategory} /> */}
    </section>
  );
};
