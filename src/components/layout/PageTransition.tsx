import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("page-enter");

  useEffect(() => {
    setTransitionStage("page-enter");
    setDisplayChildren(children);
  }, [location, children]);

  return (
    <div className={transitionStage}>
      {displayChildren}
    </div>
  );
};
