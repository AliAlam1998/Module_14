let url="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


function dropdownmenue (){
// Use D3 to read in samples.json
d3.json(url).then(data => {
    // Extract necessary data from the JSON
    const names = data.names;
    // const samples = data.samples;
    // const metadata = data.metadata;

    // Populate dropdown with options
    const dropdown = d3.select("#selDataset");
    names.forEach(name => {
        dropdown.append("option").text(name).property("value", name);
    });

    // Initial render
    updatePlots(names[0]);

    // Event listener for dropdown change
    // dropdown.on("change", function() {
    //     const selectedName = dropdown.property("value");
    //     updatePlots(selectedName);
    // });    
});
}
dropdownmenue ()


function optionChanged (selectedName){
    updatePlots(selectedName)
}
// Function to update all plots based on selected individual
function updatePlots(selectedName) {
    d3.json(url).then(data => {
        // Extract necessary data from the JSON
        // const names = data.names;
        const samples = data.samples;
        const metadata = data.metadata;




    // Use selectedName to filter samples and metadata
    const selectedSample = samples.find(sample => sample.id === selectedName);
    // const selectedMetadata = metadata.find(meta => meta.id === parseInt(selectedName));
    const selectedMetadata = metadata.find(meta => meta.id == selectedName);
    console.log(selectedMetadata)
    // Update the bar chart
    updateBarChart(selectedSample);

    // Update the bubble chart
    updateBubbleChart(selectedSample);

    // Display sample metadata
    displayMetadata(selectedMetadata);
    })
}

// Function to update the bar chart
function updateBarChart(sample) {
    // Implement bar chart code using Plotly
    // Use sample_values, otu_ids, and otu_labels
    let otu_ids = sample.otu_ids
    let otu_labels= sample.otu_labels
    let sample_values = sample.sample_values
    var data = [{
        x: sample_values.slice(0,10).reverse(),
        y:otu_ids.slice(0,10).map(otu => `otu ${otu}`).reverse() ,
        text:otu_labels.slice(0,10).reverse(),
        orientation: 'h',
        type: 'bar'
      }];
       
      var layout = {
        title: 'Bar Chart',
      };
      
      Plotly.newPlot('bar', data, layout);
      


}

// Function to update the bubble chart
function updateBubbleChart(sample) {
    // Implement bubble chart code using Plotly
    // Use otu_ids, sample_values, and otu_labels
let otu_ids = sample.otu_ids
let otu_labels= sample.otu_labels
let sample_values = sample.sample_values
    var data = [{
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          color: otu_ids,
          size: sample_values,
          colorscale:"Earth"
        }
      }];
      
   
      
      var layout = {
        title: 'Bubble chart',
      };
      
      Plotly.newPlot('bubble', data, layout);
      


}

// Function to display sample metadata
function displayMetadata(metadata) {
    // Display metadata on the page
    const metadataDiv = d3.select("#sample-metadata");
    metadataDiv.html(""); // Clear previous content
    Object.entries(metadata).forEach(([key, value]) => {
        metadataDiv.append("p").text(`${key}: ${value}`);
    });
}