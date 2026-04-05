import * as d3 from "d3";
import { useEffect, useRef } from "react";

const data = [
  { label: "China", value: 52, color: "#c8853a" },
  { label: "India", value: 13, color: "#8faae0" },
  { label: "Bangladesh", value: 7, color: "#90c890" },
  { label: "Vietnam", value: 6, color: "#e8a85a" },
  { label: "Turkey", value: 4, color: "#c890c8" },
  { label: "Others", value: 18, color: "#6b6460" },
];

export default function ExportsDonutChart() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    d3.select(el).selectAll("*").remove();

    const style = getComputedStyle(document.documentElement);
    const surface = style.getPropertyValue("--surface").trim() || "#f5f2ed";
    const muted = style.getPropertyValue("--muted").trim() || "#8a8278";

    const W = el.clientWidth || 480;
    const H = 280;
    const radius = Math.min(H, 220) / 2 - 10;
    const innerRadius = radius * 0.58;
    const cx = radius + 20;
    const cy = H / 2;

    const svg = d3.select(el).attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");

    const pie = d3
      .pie<(typeof data)[0]>()
      .value(d => d.value)
      .sort(null)
      .padAngle(0.02);
    const arc = d3.arc<d3.PieArcDatum<(typeof data)[0]>>().innerRadius(innerRadius).outerRadius(radius);
    const arcHover = d3
      .arc<d3.PieArcDatum<(typeof data)[0]>>()
      .innerRadius(innerRadius)
      .outerRadius(radius + 6);

    const g = svg.append("g").attr("transform", `translate(${cx},${cy})`);

    const slices = g
      .selectAll(".slice")
      .data(pie(data))
      .join("path")
      .attr("class", "slice")
      .attr("d", arc)
      .attr("fill", d => d.data.color)
      .attr("opacity", 0.88)
      .style("cursor", "pointer")
      .style("transition", "opacity 0.2s");

    slices
      .on("mouseenter", function (_, d) {
        d3.select(this)
          .attr("d", arcHover(d) as string)
          .attr("opacity", 1);
        centerNum.text(d.data.value + "%");
        centerLabel.text(d.data.label);
      })
      .on("mouseleave", function (_, d) {
        d3.select(this)
          .attr("d", arc(d) as string)
          .attr("opacity", 0.88);
        centerNum.text("$330B");
        centerLabel.text("total exports");
      });

    // Center text
    const centerNum = g
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.1em")
      .attr("fill", surface)
      .attr("font-size", 20)
      .attr("font-weight", 800)
      .text("$330B");

    const centerLabel = g
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1.6em")
      .attr("fill", muted)
      .attr("font-size", 11)
      .text("total exports");

    // Legend
    const legendX = cx * 2 + 10;
    const legend = svg.append("g").attr("transform", `translate(${legendX}, ${cy - data.length * 13})`);

    data.forEach((d, i) => {
      const row = legend.append("g").attr("transform", `translate(0, ${i * 26})`);
      row.append("rect").attr("width", 10).attr("height", 10).attr("rx", 2).attr("fill", d.color).attr("y", -1);
      row
        .append("text")
        .attr("x", 16)
        .attr("y", 9)
        .attr("fill", muted)
        .attr("font-size", 12)
        .text(`${d.label} — ${d.value}%`);
    });
  }, []);

  return (
    <div className='chart-wrap'>
      <div className='chart-label'>Top Textile Exporting Countries (% of global export value, 2023)</div>
      <svg ref={ref} style={{ width: "100%", height: 280, display: "block" }} />
    </div>
  );
}
