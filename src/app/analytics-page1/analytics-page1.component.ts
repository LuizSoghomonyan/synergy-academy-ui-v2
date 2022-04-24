import { Component, OnInit } from '@angular/core';
declare var google:any;
@Component({
  selector: 'app-analytics-page1',
  templateUrl: './analytics-page1.component.html',
  styleUrls: ['./analytics-page1.component.css']
})
export class AnalyticsPage1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
      google.charts.load('current', {'packages':['table']});
      google.charts.setOnLoadCallback(drawTable);

      function drawTable() {
          var data = new google.visualization.DataTable();
          data.addColumn('string', 'Name');
          data.addColumn('number', 'Salary');
          data.addColumn('boolean', 'Full Time Employee');
          data.addRows([
              ['Mike',  {v: 10000, f: '$10,000'}, true],
              ['Jim',   {v:8000,   f: '$8,000'},  false],
              ['Alice', {v: 12500, f: '$12,500'}, true],
              ['Bob',   {v: 7000,  f: '$7,000'},  true],
              ['Mike',  {v: 10000, f: '$10,000'}, true],
              ['Jim',   {v:8000,   f: '$8,000'},  false],
              ['Alice', {v: 12500, f: '$12,500'}, true],
              ['Bob',   {v: 7000,  f: '$7,000'},  true],
              ['Mike',  {v: 10000, f: '$10,000'}, true],
              ['Jim',   {v:8000,   f: '$8,000'},  false],
              ['Alice', {v: 12500, f: '$12,500'}, true],
              ['Bob',   {v: 7000,  f: '$7,000'},  true],
              ['Mike',  {v: 10000, f: '$10,000'}, true],
              ['Jim',   {v:8000,   f: '$8,000'},  false],
              ['Alice', {v: 12500, f: '$12,500'}, true],
              ['Bob',   {v: 7000,  f: '$7,000'},  true],
              ['Mike',  {v: 10000, f: '$10,000'}, true],
              ['Jim',   {v:8000,   f: '$8,000'},  false],
              ['Alice', {v: 12500, f: '$12,500'}, true],
              ['Bob',   {v: 7000,  f: '$7,000'},  true]
          ]);

          var table = new google.visualization.Table(document.getElementById('table_div'));

          table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
      }


      google.charts.load('current', {'packages':['bar']});
      google.charts.setOnLoadCallback(drawStuff);

      function drawStuff() {
          var data = new google.visualization.arrayToDataTable([
              ['Galaxy', 'Distance', 'Brightness'],
              ['Canis Major Dwarf', 8000, 23.3],
              ['Sagittarius Dwarf', 24000, 4.5],
              ['Ursa Major II Dwarf', 30000, 14.3],
              ['Lg. Magellanic Cloud', 50000, 0.9],
              ['Bootes I', 60000, 13.1]
          ]);

          var options = {
              width: 800,
              chart: {
                  title: 'Nearby galaxies',
                  subtitle: 'distance on the left, brightness on the right'
              },
              bars: 'horizontal', // Required for Material Bar Charts.
              series: {
                  0: { axis: 'distance' }, // Bind series 0 to an axis named 'distance'.
                  1: { axis: 'brightness' } // Bind series 1 to an axis named 'brightness'.
              },
              axes: {
                  x: {
                      distance: {label: 'parsecs'}, // Bottom x-axis.
                      brightness: {side: 'top', label: 'apparent magnitude'} // Top x-axis.
                  }
              }
          };

          var chart = new google.charts.Bar(document.getElementById('dual_x_div'));
          chart.draw(data, options);
      };




      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
          var data = google.visualization.arrayToDataTable([
              ['Dinosaur', 'Length'],
              ['Acrocanthosaurus (top-spined lizard)', 12.2],
              ['Albertosaurus (Alberta lizard)', 9.1],
              ['Allosaurus (other lizard)', 12.2],
              ['Apatosaurus (deceptive lizard)', 22.9],
              ['Archaeopteryx (ancient wing)', 0.9],
              ['Argentinosaurus (Argentina lizard)', 36.6],
              ['Baryonyx (heavy claws)', 9.1],
              ['Brachiosaurus (arm lizard)', 30.5],
              ['Ceratosaurus (horned lizard)', 6.1],
              ['Coelophysis (hollow form)', 2.7],
              ['Compsognathus (elegant jaw)', 0.9],
              ['Deinonychus (terrible claw)', 2.7],
              ['Diplodocus (double beam)', 27.1],
              ['Dromicelomimus (emu mimic)', 3.4],
              ['Gallimimus (fowl mimic)', 5.5],
              ['Mamenchisaurus (Mamenchi lizard)', 21.0],
              ['Megalosaurus (big lizard)', 7.9],
              ['Microvenator (small hunter)', 1.2],
              ['Ornithomimus (bird mimic)', 4.6],
              ['Oviraptor (egg robber)', 1.5],
              ['Plateosaurus (flat lizard)', 7.9],
              ['Sauronithoides (narrow-clawed lizard)', 2.0],
              ['Seismosaurus (tremor lizard)', 45.7],
              ['Spinosaurus (spiny lizard)', 12.2],
              ['Supersaurus (super lizard)', 30.5],
              ['Tyrannosaurus (tyrant lizard)', 15.2],
              ['Ultrasaurus (ultra lizard)', 30.5],
              ['Velociraptor (swift robber)', 1.8]]);

          var options = {
              title: 'Lengths of dinosaurs, in meters',
              legend: { position: 'none' },
          };

          var chart = new google.visualization.Histogram(document.getElementById('chart_div'));
          chart.draw(data, options);
      }





    this.forChart()
    this.forChart2()






  }

  forChart()
  {

      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

          var data = google.visualization.arrayToDataTable([
              ['Task', 'Hours per Day'],
              ['Work',     11],
              ['Eat',      2],
              ['Commute',  2],
              ['Watch TV', 2],
              ['Sleep',    7]
          ]);

          var options = {
              title: 'My Daily Activities'
          };

          var chart = new google.visualization.PieChart(document.getElementById('piechart'));

          chart.draw(data, options);
      }
  }



  forChart2(){
      google.charts.load("current", {packages:['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
          var data = google.visualization.arrayToDataTable([
              ["Element", "Density", { role: "style" } ],
              ["Copper", 8.94, "#b87333"],
              ["Silver", 10.49, "silver"],
              ["Gold", 19.30, "gold"],
              ["Platinum", 21.45, "color: #e5e4e2"]
          ]);

          var view = new google.visualization.DataView(data);
          view.setColumns([0, 1,
              { calc: "stringify",
                  sourceColumn: 1,
                  type: "string",
                  role: "annotation" },
              2]);

          var options = {
              title: "Density of Precious Metals, in g/cm^3",
              width: 600,
              height: 400,
              bar: {groupWidth: "95%"},
              legend: { position: "none" },
          };
          var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
          chart.draw(view, options);
      }
  }
}
