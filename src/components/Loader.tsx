import type { CSSProperties } from "react";
import { ClipLoader } from "react-spinners";

const Loader: React.FC<{ loading: boolean; size?: number; color?: string }> = ({
  loading,
  size = 50,
  color = "#4F46E5",
}) => {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: color,
  };

  return (
    <div className="">
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={size}
      />
    </div>
  );
};
export default Loader;
