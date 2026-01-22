export function apexChartTooltipOneLine(
  label: string,
  value: string | number,
  color: string,
  isDark: boolean,
) {
  // Extremely tight shadow with maximum negative spread
  const bg = isDark ? "rgb(33, 43, 54)" : "rgb(255, 255, 255)";
  const text = isDark ? "rgb(255, 255, 255)" : "rgb(33, 43, 54)";
  const border = isDark
    ? "rgba(145, 158, 171, 0.2)"
    : "rgba(145, 158, 171, 0.15)";
  const shadow = isDark
    ? "0 8px 16px -12px rgba(0,0,0,0.3)"
    : "0 8px 16px -12px rgba(145,158,171,0.2)";

  const showLabel = label && label.toString().trim().toLowerCase() !== "value";
  return `
    <div style="position:relative;padding:12px 16px;border-radius:8px;color:${text};display:flex;align-items:center;gap:12px;min-width:140px;box-shadow:${shadow};border:1px solid ${border};overflow:hidden;">
      <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:${bg};opacity:0.7;border-radius:8px;backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);z-index:0;"></div>
      <span style="position:relative;z-index:1;width:12px;height:12px;border-radius:50%;background:${color};display:inline-block;flex-shrink:0;"></span>
      <div style="position:relative;z-index:1;white-space:nowrap;font-family:'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;font-size:13px;line-height:1.5">
        ${showLabel ? `<span style="font-weight:600">${label}:</span>` : ""}
        <span style="font-weight:600">${value}</span>
      </div>
    </div>
  `;
}

export function apexChartTooltipWithTitle(
  title: string,
  label: string,
  value: string | number,
  color: string,
  isDark: boolean,
) {
  // Extremely tight shadow with maximum negative spread
  const bg = isDark ? "rgb(33, 43, 54)" : "rgb(255, 255, 255)";
  const text = isDark ? "rgb(255, 255, 255)" : "rgb(33, 43, 54)";
  const titleBg = isDark
    ? "rgba(145, 158, 171, 0.15)"
    : "rgba(145, 158, 171, 0.1)";
  const titleColor = isDark ? "rgb(145, 158, 171)" : "rgb(99, 115, 129)";
  const border = isDark
    ? "rgba(145, 158, 171, 0.2)"
    : "rgba(145, 158, 171, 0.15)";
  const shadow = isDark
    ? "0 8px 16px -12px rgba(0,0,0,0.3)"
    : "0 8px 16px -12px rgba(145,158,171,0.2)";

  const showLabel = label && label.toString().trim().toLowerCase() !== "value";
  return `
    <div style="position:relative;border-radius:8px;color:${text};max-width:180px;box-shadow:${shadow};border:1px solid ${border};overflow:hidden;">
      <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:${bg};opacity:0.7;border-radius:8px;backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);z-index:0;"></div>
      <div style="position:relative;z-index:1;background:${titleBg};padding:8px 16px;color:${titleColor};font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;font-family:'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;text-align:center;">${title}</div>
      <div style="position:relative;z-index:1;padding:12px 16px;display:flex;align-items:center;gap:12px">
        <span style="width:12px;height:12px;border-radius:50%;background:${color};display:inline-block;flex-shrink:0;"></span>
        <div style="white-space:nowrap;font-family:'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;font-size:13px;line-height:1.5">
          ${showLabel ? `<span style="font-weight:600">${label}:</span>` : ""}
          <span style="font-weight:600">${value}</span>
        </div>
      </div>
    </div>
  `;
}

export function apexChartTooltipMultipleEntries(
  title: string,
  entries: Array<{ label: string; value: string | number; color: string }>,
  isDark: boolean,
) {
  const bg = isDark ? "rgb(33, 43, 54)" : "rgb(255, 255, 255)";
  const text = isDark ? "rgb(255, 255, 255)" : "rgb(33, 43, 54)";
  const border = isDark
    ? "rgba(145, 158, 171, 0.2)"
    : "rgba(145, 158, 171, 0.15)";
  const shadow = isDark
    ? "0 8px 16px -12px rgba(0,0,0,0.3)"
    : "0 8px 16px -12px rgba(145,158,171,0.2)";
  const titleBg = isDark
    ? "rgba(145, 158, 171, 0.15)"
    : "rgba(145, 158, 171, 0.1)";
  const titleColor = isDark ? "rgb(145, 158, 171)" : "rgb(99, 115, 129)";

  const rows = entries
    .map(
      (e) => `
        <div style="display:flex;align-items:center;gap:12px;padding:8px 16px">
          <span style="width:12px;height:12px;border-radius:50%;background:${e.color};display:inline-block;flex-shrink:0;"></span>
          <div style="white-space:nowrap;font-family:'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;font-size:13px;line-height:1.5">
            <span style="font-weight:600">${e.label}:</span>
            <span style="font-weight:600">${e.value}</span>
          </div>
        </div>
      `,
    )
    .join("");

  return `
    <div style="position:relative;border-radius:8px;color:${text};max-width:220px;box-shadow:${shadow};border:1px solid ${border};overflow:hidden;">
      <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:${bg};opacity:0.7;border-radius:8px;backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);z-index:0;"></div>
      <div style="position:relative;z-index:1;background:${titleBg};padding:8px 16px;color:${titleColor};font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;font-family:'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;text-align:center;">${title}</div>
      <div style="position:relative;z-index:1;">${rows}</div>
    </div>
  `;
}
