//这里放组件的props和公共方法
import type { ExtractPropTypes } from "vue";
export const iconProps = {
  size: {
    type: String,
    default: "16px",
  },
  color: {
    type: String,
    default: "#303133",
  },
};

export type IconProps = ExtractPropTypes<typeof iconProps>;
