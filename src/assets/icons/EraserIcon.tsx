import { Icon, IconProps } from "@mui/material";
export const EraserIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M898.56 432.64c10.24-10.24 10.24-25.6 0-35.84l-238.08-230.4c-10.24-10.24-25.6-10.24-35.84 0L125.44 680.96c-10.24 10.24-10.24 25.6 0 35.84l99.84 97.28 53.76 51.2h576c15.36 0 25.6-10.24 25.6-25.6s-10.24-25.6-25.6-25.6H529.92l368.64-381.44zM179.2 698.88l248.32-258.56 202.24 194.56-171.52 179.2h-161.28L179.2 698.88z"
          fill="#000000"
        />
      </svg>
    </Icon>
  );
};

export default EraserIcon;
