import * as d3 from "d3";
import { useEffect, useRef } from "react";

const data = [
  { label: "Water recycling systems", value: 74, color: "#90c890" },
  { label: "Renewable energy use", value: 49, color: "#90c890" },
  { label: "Digital fabric sampling", value: 31, color: "#8faae0" },
  { label: "Dead stock resale programs", value: 17, color: "#8faae0" },
];

export default function SustainabilityChart() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    d3.select(el).selectAll("*").remove();

    const style = getComputedStyle(document.documentElement);
    const muted = style.getPropertyValue("--muted").trim() || "#8a8278";
    const ink2 = style.getPropertyValue("--ink-3").trim() || "#2a2724";

    const margin = { top: 10, right: 60, bottom: 10, left: 200 };
    const W = el.clientWidth || 580;
    const H = data.length * 52 + margin.top + margin.bottom;
    const w = W - margin.left - margin.right;
    const rowH = 26;

    const svg = d3.select(el).attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([0, 100]).range([0, w]);
    const y = d3
      .scaleBand()
      .domain(data.map(d => d.label))
      .range([0, H - margin.top - margin.bottom])
      .padding(0.4);

    // Background track
    g.selectAll(".track")
      .data(data)
      .join("rect")
      .attr("x", 0)
      .attr("y", d => y(d.label)!)
      .attr("width", w)
      .attr("height", rowH)
      .attr("rx", 3)
      .attr("fill", ink2)
      .attr("opacity", 0.5);

    // Filled bar
    g.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("x", 0)
      .attr("y", d => y(d.label)!)
      .attr("height", rowH)
      .attr("width", 0)
      .attr("rx", 3)
      .attr("fill", d => d.color)
      .attr("opacity", 0.75)
      .transition()
      .duration(800)
      .delay((_, i) => i * 100)
      .attr("width", d => x(d.value));

    // Labels left
    g.selectAll(".stage-label")
      .data(data)
      .join("text")
      .attr("x", -12)
      .attr("y", d => y(d.label)! + rowH / 2 + 4)
      .attr("text-anchor", "end")
      .attr("fill", muted)
      .attr("font-size", 12)
      .text(d => d.label);

    // Percentage right
    g.selectAll(".pct-label")
      .data(data)
      .join("text")
      .attr("x", d => x(d.value) + 8)
      .attr("y", d => y(d.label)! + rowH / 2 + 4)
      .attr("fill", d => d.color)
      .attr("font-size", 12)
      .attr("font-weight", 700)
      .text(d => `${d.value}%`);
  }, []);

  return (
    <div className='chart-wrap'>
      <div className='chart-label'>Sustainability Adoption Among Textile Manufacturers (2023 survey, n=1,200)</div>
      <svg ref={ref} style={{ width: "100%", display: "block" }} />
    </div>
  );
}
