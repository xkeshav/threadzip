import * as d3 from "d3";
import { useEffect, useRef } from "react";

const data = [
  { stage: "Raw Fiber", value: 1.2, max: 40 },
  { stage: "Yarn Spinning", value: 2.8, max: 40 },
  { stage: "Weaving / Knitting", value: 5.5, max: 40 },
  { stage: "Dyeing & Finishing", value: 9.0, max: 40 },
  { stage: "Garment / Product", value: 29.0, max: 40, label: "$18–40" },
];

export default function ValueChainChart() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    d3.select(el).selectAll("*").remove();

    const style = getComputedStyle(document.documentElement);
    const amber = style.getPropertyValue("--amber").trim() || "#c8853a";
    const muted = style.getPropertyValue("--muted").trim() || "#8a8278";
    const surface = style.getPropertyValue("--surface").trim() || "#f5f2ed";

    const margin = { top: 10, right: 70, bottom: 10, left: 160 };
    const W = el.clientWidth || 580;
    const H = data.length * 48 + margin.top + margin.bottom;
    const w = W - margin.left - margin.right;
    const rowH = 28;

    const svg = d3.select(el).attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([0, 40]).range([0, w]);
    const y = d3
      .scaleBand()
      .domain(data.map(d => d.stage))
      .range([0, H - margin.top - margin.bottom])
      .padding(0.35);

    // Stage labels
    g.selectAll(".stage-label")
      .data(data)
      .join("text")
      .attr("x", -12)
      .attr("y", d => y(d.stage)! + y.bandwidth() / 2 + 4)
      .attr("text-anchor", "end")
      .attr("fill", muted)
      .attr("font-size", 12)
      .text(d => d.stage);

    // Bars
    g.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("x", 0)
      .attr("y", d => y(d.stage)!)
      .attr("height", rowH)
      .attr("width", 0)
      .attr("rx", 3)
      .attr("fill", amber)
      .attr("opacity", (_, i) => 0.35 + i * 0.14)
      .transition()
      .duration(700)
      .delay((_, i) => i * 80)
      .attr("width", d => x(d.value));

    // Value labels
    g.selectAll(".val-label")
      .data(data)
      .join("text")
      .attr("x", d => x(d.value) + 8)
      .attr("y", d => y(d.stage)! + rowH / 2 + 4)
      .attr("fill", surface)
      .attr("font-size", 12)
      .attr("font-weight", 700)
      .text(d => d.label ?? `$${d.value}`);
  }, []);

  return (
    <div className='chart-wrap'>
      <div className='chart-label'>Value Added at Each Stage (USD per kg of finished fabric)</div>
      <svg ref={ref} style={{ width: "100%", display: "block" }} />
    </div>
  );
}
