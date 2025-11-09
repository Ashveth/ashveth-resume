import { ReactNode } from "react";

interface SectionTransitionProps {
  children: ReactNode;
  id: string;
}

const SectionTransition = ({ children, id }: SectionTransitionProps) => {
  return (
    <div 
      id={id} 
      className="section-transition-wrapper"
      data-section-id={id}
    >
      {children}
    </div>
  );
};

export default SectionTransition;
