import React, { Component } from "react";
import * as d3 from "d3";

class Animation extends Component {
    myRef=React.createRef();
  componentDidMount() {
    const data = [
        { name: "Medellín", index2005: 3, index2006: 33 },
        { name: "Cali", index2005: 39, index2006: 45 },
        { name: "Bogotá", index2005: 7, index2006: 31 },
        { name: "Pereira", index2005: 35, index2006: 36 },
        { name: "Bucaramanga", index2005: 16, index2006: 23 },
        { name: "Cúcuta", index2005: 45, index2006: 45 },
        { name: "Armenia", index2005: 6, index2006: 16 }
    ];
    this.drawChart(data);
  }

  drawChart(data) {
    const canvas = d3.select(this.myRef.current);
    
    const width =700
    const height=500
    const margin ={top:10,left:50,bottom: 40, right:10}
    const iwidth =width-margin.left -margin.right
    const iheight =height -margin.top-margin.bottom
    const svg = canvas.append("svg")
    svg.attr("width",width)
    svg.attr("height",height)
    
    let g =svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)
   
    const y =d3.scaleLinear()
        .domain([0, Math.max.apply(Math, data.map(function(o) { return o.index2005; }))])
        .range([iheight,0])
    
    const x=d3.scaleBand()
        .domain(data.map(d=>d.name))
        .range([0,iwidth])
        .padding(0.1)
    
    const bars =g.selectAll("rect").data(data)
    
    bars.enter().append("rect")
        .attr("class","bar")
        .style("fill","orange")
        .attr("x",d=>x(d.name))
        .attr("y",d=>y(d.index2005))
        .attr("height", d=>iheight-y(d.index2005))
        .attr("width", x.bandwidth())
    
    g.append("g")
        .classed("x--axis",true)
        .call(d3.axisBottom(x))
        .attr("transform",`translate(0,${iheight})`)
    
    g.append("g")
        .classed("y--axis",true)
        .call(d3.axisLeft(y))

        d3.select("#start").on("click", function () {
            svg.selectAll("rect")
                .transition()
                .attr("y",  d=>y(d.index2006))
                .attr("height", d=>iheight-y(d.index2006))
                .style("fill","steelblue")
                .delay(500)
                .duration(5000)
        });   
  }

  render() {
    return <div ref={this.myRef}>
        <button id="start">Start</button>
    </div>;
  }
}

export default Animation;