
// Data
const data = [
    { year: 1993, jan: 23.786, feb: 25.062, mar: 29.385, apr: 32.062, may: 33.809, jun: 30.877, jul: 27.677, aug: 26.6, sep: 26.777, oct: 26.732, nov: 24.485, dec: 21.308 },
    { year: 1994, jan: 23.608, feb: 26.285, mar: 30.562, apr: 31.209, may: 33.855, jun: 29.323, jul: 26.577, aug: 26.277, sep: 27.131, oct: 26.231, nov: 23.162, dec: 21.186 },
    { year: 1995, jan: 21.708, feb: 26.062, mar: 29.362, apr: 31.862, may: 31.132, jun: 31.055, jul: 27.177, aug: 27.477, sep: 27.154, oct: 26.231, nov: 25.085, dec: 23.485 },
    { year: 1996, jan: 24.685, feb: 26.439, mar: 30.216, apr: 30.963, may: 33.932, jun: 30.177, jul: 27.854, aug: 26.277, sep: 26.877, oct: 25.931, nov: 24.285, dec: 22.686 },
    { year: 1997, jan: 22.586, feb: 25.363, mar: 29.262, apr: 30.085, may: 32.754, jun: 30.7, jul: 27.877, aug: 27, sep: 27.154, oct: 26.832, nov: 26.162, dec: 24.962 },
    { year: 1998, jan: 25.209, feb: 27.185, mar: 30.462, apr: 33.262, may: 34.154, jun: 31.5, jul: 28.577, aug: 26.977, sep: 27.054, oct: 26.632, nov: 24.908, dec: 21.908 },
    { year: 1999, jan: 22.785, feb: 26.563, mar: 30.262, apr: 33.085, may: 31.554, jun: 28.5, jul: 27.277, aug: 26.477, sep: 26.354, oct: 26.531, nov: 24.685, dec: 22.708 },
    { year: 2000, jan: 24.185, feb: 26.385, mar: 29.062, apr: 33.085, may: 31.754, jun: 27.577, jul: 26.577, aug: 26.377, sep: 26.777, oct: 27.431, nov: 25.085, dec: 22.586 },
    { year: 2001, jan: 24.086, feb: 27.239, mar: 29.786, apr: 31.893, may: 33.855, jun: 28.577, jul: 27.8, aug: 26.431, sep: 27.754, oct: 26.331, nov: 25.586, dec: 23.008 },
    { year: 2002, jan: 23.608, feb: 26.339, mar: 30.339, apr: 33.285, may: 33.354, jun: 29.3, jul: 28.2, aug: 25.9, sep: 27.177, oct: 26.832, nov: 23.986, dec: 23.262 }
];

// Selectors
const yearSelect = document.getElementById('year-select');
const chartContainer = d3.select('#chart-container');

// Function to draw chart
function drawChart(selectedYear) {
    const selectedData = data.find(d => d.year === selectedYear);

    const months = Object.keys(selectedData).filter(key => key !== 'year');

    const chartData = months.map(month => ({ month, temperature: selectedData[month] }));

    const margin = { top: 33, right: 20, bottom: 55, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    chartContainer.selectAll('*').remove();

    const svg = chartContainer.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .domain(months)
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(chartData, d => d.temperature)])
        .nice()
        .range([height, 0]);

    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append('g')
        .call(d3.axisLeft(y));

    svg.selectAll('.bar')
        .data(chartData)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.month))
        .attr('y', d => y(d.temperature))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.temperature))
        .attr('fill', 'steelblue');

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.top + 20)
        .style('text-anchor', 'middle')
        .text('Month');

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', -margin.left)
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Temperature (°C)');

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', -margin.top / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '1.5em')
        .text(`Average Temperature in ${selectedYear}`);
}

// Initial draw
drawChart(1993);

// Event listener for dropdown change
yearSelect.addEventListener('change', function () {
    const selectedYear = parseInt(this.value);
    drawChart(selectedYear);
});