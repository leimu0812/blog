// 标签颜色配置
export const tagColors = [
  { bg: "#e5f7ff", color: "#409EFF" }, // 蓝色
  { bg: "#f0f9eb", color: "#67C23A" }, // 绿色
  { bg: "#fdf6ec", color: "#E6A23C" }, // 橙色
  { bg: "#fef0f0", color: "#F56C6C" }, // 红色
  { bg: "#f5f2fd", color: "#8e44ad" }, // 紫色
  { bg: "#edf9f8", color: "#16a085" }, // 青色
  { bg: "#fef6f1", color: "#e67e22" }, // 橘色
  { bg: "#f1f5fb", color: "#3498db" }, // 天蓝色
  { bg: "#fef5f7", color: "#e84393" }, // 粉色
  { bg: "#f6f6f6", color: "#34495e" }, // 深灰色
  { bg: "#e0f7fa", color: "#00acc1" }, // 浅青蓝色
  { bg: "#fce4ec", color: "#d81b60" }, // 深粉色
  { bg: "#fff8e1", color: "#f57c00" }, // 深橙色
  { bg: "#e8f5e9", color: "#4caf50" }, // 深绿色
  { bg: "#fff3e0", color: "#ffab00" }, // 亮橘黄色
  { bg: "#e8eaf6", color: "#5c6bc0" }, // 深天蓝色
  { bg: "#f3e5f5", color: "#ab47bc" }, // 深紫色
  { bg: "#efebe9", color: "#795548" }, // 深棕色
  { bg: "#e0f7fa", color: "#00bcd4" }, // 青蓝色
  { bg: "#f8bbd0", color: "#ad1457" }, // 玫瑰红色
];

// 获取随机标签样式
export const getRandomTagStyle = () => {
  const color = tagColors[Math.floor(Math.random() * tagColors.length)];
  return {
    backgroundColor: color.bg,
    color: color.color,
    border: "none",
  };
};
