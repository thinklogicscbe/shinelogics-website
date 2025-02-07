import { useEffect, ReactNode } from "react";

interface PathTrackerProps {
  path: string;
  children: ReactNode;
}

const PathTracker: React.FC<PathTrackerProps> = ({ path, children }) => {
  useEffect(() => {
    localStorage.setItem("currentPath", path);
  }, [path]);

  return <>{children}</>;
};

export default PathTracker;
