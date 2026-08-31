"use client";

import { useEffect, useState } from "react";

export default function DynamicYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <>{year ?? 2026}</>;
}