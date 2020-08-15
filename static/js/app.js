// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

function buildTable(data) {
    // First clear out any existing data
    tbody.html("");

    // Loop through each object in data and append a row and cells for each value in the row
    data.forEach((dataRow) => {
        // Append a row to the table body
        let row = tbody.append("tr");

        // Loop through each field in the dataRow and add each value as a table cell (td)
	    Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
            }
        );
    });
}



var filters = {};

function updateFilters() {

    let date = d3.select("#datetime").property("value");
    let city = d3.select('#city').property("value");
    let state = d3.select('#state').property("value");
    let country = d3.select('#country').property("value");
    let shape = d3.select('#shape').property("value");

    let filteredData = tableData;

    if (date) {
        filteredData = filteredData.filter(row => row.datetime === date);
    }
    else if (city) {
        filteredData = filteredData.filter(row => row.city === city);
    }
    else if (state) {
        filteredData = filteredData.filter(row => row.state === state);
    }
    else if (country) {
        filteredData = filteredData.filter(row => row.country === country);
    }
    else if (shape) {
        filteredData = filteredData.filter(row => row.shape === shape);
    }

    buildTable(filteredData);

}
    
function filterTable() {

    Object.entries(filters).forEach(([key, value]) => {
        console.log(key)
        console.log(value)
        filteredData = filteredData.filter(row => row.key === value);
      });

    filterTable();
}

d3.selectAll("#filter-btn").on("click", updateFilters);

buildTable(tableData);