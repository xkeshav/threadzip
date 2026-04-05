import * as d3 from "d3";
import { useEffect, useRef } from "react";

const data = [
  { year: "2018", value: 1.3, projected: false },
  { year: "2019", value: 1.38, projected: false },
  { year: "2020", value: 1.21, projected: false },
  { year: "2021", value: 1.45, projected: false },
  { year: "2022", value: 1.6, projected: false },
  { year: "2023", value: 1.74, projected: false },
  { year: "2025", value: 1.95, projected: true },
  { year: "2030", value: 2.4, projected: true },
];

export default function MarketSizeChart() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    d3.select(el).selectAll("*").remove();

    const style = getComputedStyle(document.documentElement);
    const amber = style.getPropertyValue("--amber").trim() || "#c8853a";
    const muted = style.getPropertyValue("--muted").trim() || "#8a8278";
    const surface = style.getPropertyValue("--surface").trim() || "#f5f2ed";
    const border = style.getPropertyValue("--border-strong").trim() || "rgba(14,12,10,0.22)";

    const margin = { top: 24, right: 20, bottom: 40, left: 48 };
    const W = el.clientWidth || 600;
    const H = 260;
    const w = W - margin.left - margin.right;
    const h = H - margin.top - margin.bottom;

    const svg = d3.select(el).attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map(d => d.year))
      .range([0, w])
      .padding(0.28);
    const y = d3.scaleLinear().domain([0, 2.6]).range([h, 0]);

    // Grid lines
    g.append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickSize(-w)
          .tickFormat(() => ""),
      )
      .call(gg => gg.select(".domain").remove())
      .call(gg =>
        gg.selectAll("line").attr("stroke", border).attr("stroke-dasharray", "4 4").attr("stroke-width", 0.5),
      );

    // Bars
    g.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.year)!)
      .attr("y", d => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", d => h - y(d.value))
      .attr("rx", 3)
      .attr("fill", amber)
      .attr("opacity", d => (d.projected ? 0.4 : 0.85))
      .attr("stroke", d => (d.projected ? amber : "none"))
      .attr("stroke-width", d => (d.projected ? 1 : 0))
      .attr("stroke-dasharray", d => (d.projected ? "4 3" : "none"));

    // Value labels
    g.selectAll(".val-label")
      .data(data)
      .join("text")
      .attr("class", "val-label")
      .attr("x", d => x(d.year)! + x.bandwidth() / 2)
      .attr("y", d => y(d.value) - 6)
      .attr("text-anchor", "middle")
      .attr("fill", d => (d.projected ? muted : surface))
      .attr("font-size", 11)
      .attr("font-weight", 700)
      .text(d => d.value.toFixed(2));

    // X axis
    g.append("g")
      .attr("transform", `translate(0,${h})`)
      .call(d3.axisBottom(x).tickSize(0))
      .call(gg => gg.select(".domain").attr("stroke", border))
      .call(gg => gg.selectAll("text").attr("fill", muted).attr("font-size", 11).attr("dy", "1.2em"));

    // Y axis
    g.append("g")
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickFormat(d => `${d}T`),
      )
      .call(gg => gg.select(".domain").remove())
      .call(gg => gg.selectAll("text").attr("fill", muted).attr("font-size", 11))
      .call(gg => gg.selectAll("line").remove());
  }, []);

  return (
    <div className='chart-wrap'>
      <div className='chart-label'>Global Textile Market Size (USD Trillion)</div>
      <svg ref={ref} style={{ width: "100%", height: 260, display: "block" }} />
      <div className='chart-legend'>
        <span className='legend-dot solid' /> Actual &nbsp;&nbsp;
        <span className='legend-dot dashed' /> Projected
      </div>
    </div>
  );
}
