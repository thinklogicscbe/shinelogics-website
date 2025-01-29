import { SvgIconProps } from "../types";


export const SvgIcon = ({ src, width = "100%", height = "auto"}: SvgIconProps) => (
  <img src={`/img/svg/${src}`} alt={src} style={{ width, height }} />
);