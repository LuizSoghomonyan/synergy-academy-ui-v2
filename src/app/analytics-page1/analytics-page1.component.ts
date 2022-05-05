import {Component, OnInit} from '@angular/core';
import {Config, DataService, Student} from "../services/data.service";
import {Observable} from "rxjs";
import {AnalyticsService} from "../services/analytics.service";

declare var google: any;

@Component({
    selector: 'app-analytics-page1',
    templateUrl: './analytics-page1.component.html',
    styleUrls: ['./analytics-page1.component.css']
})

export class AnalyticsPage1Component implements OnInit {
    tableData$: Observable<any>

    constructor(private dataService: DataService, private analyticsService: AnalyticsService) {
    }

    tableData: any
    histogramDto: any
    pieChartDto: any
    columnChartDto: any

    ngOnInit(): void {
        this.analyticsService.tableReport().subscribe(x => {
            this.tableData = x
            this.forTable(this.tableData);
        })

        this.analyticsService.pieChart().subscribe(x => {
            this.pieChartDto = x;
            this.forChart(this.pieChartDto);
        })


        this.analyticsService.histogram().subscribe(x => {
            this.histogramDto = x;
            this.forHistogran(this.histogramDto);
        })


        this.analyticsService.columnChart().subscribe(x => {
            this.columnChartDto = x;
            this.forChart2(this.columnChartDto);
        })


    }

    forChart(pieChartDto: any) {

        google.charts.load('current', {'packages': ['corechart']});
        google.charts.setOnLoadCallback(drawChart);


        function drawChart() {
            // var data = google.visualization.arrayToDataTable([
            //     ['Task', 'Hours per Day'],
            //     ['Work',     11],
            //     ['Eat',      2],
            //     ['Commute',  2],
            //     ['Watch TV', 2],
            //     ['Sleep',    7]
            // ]);


            var data = new google.visualization.DataTable();

            //columns
            data.addColumn('string', 'Office Name');
            data.addColumn('number', 'Number Of Courses');


            //data
            for (var i = 0; i < pieChartDto.length; i++) {
                const c = [
                    pieChartDto[i]._officename,
                    pieChartDto[i]._numberofcourses

                ];
                data.addRow(c);
            }


            var options = {
                title: 'Number of courses per office',
                colors: ['#0285e3', '#275f87', '#72a8cf', '#58656e', '#2d363d']
            };

            var chart = new google.visualization.PieChart(document.getElementById('piechart'));

            chart.draw(data, options);
        }
    }


//todo
    forChart2(columnChartDto: any) {
        // //  "_fullname" varchar, "_examname" varchar, "_grade" numeric, "_universityname" varchar
        // google.charts.load("current", {packages:["corechart"]});
        // google.charts.setOnLoadCallback(drawChart);
        // function drawChart() {
        //
        //     var data = new google.visualization.DataTable();
        //
        //
        //     // "_fullname" : "Ryan Daugherty",
        //     //     "_examname" : "81563a3e3bc8538506f5c8f1",
        //     //     "_grade" : 100,
        //     //     "_universityname" : "Yerevan State University (1919)"
        //
        //
        //     //columns
        //     data.addColumn('string', 'Student Name');
        //     // data.addColumn('string', 'Exam Name');
        //     // data.addColumn('string', 'University Name');
        //     data.addColumn('number', 'Grade');
        //
        //
        //     //data
        //     for (var i = 0; i <  columnChartDto.length; i++){
        //         const c = [
        //             columnChartDto[i]._fullname,
        //             // columnChartDto[i]._examname,
        //             // columnChartDto[i]._universityname,
        //             columnChartDto[i]._grade
        //
        //         ];
        //         data.addRow(c);
        //     }
        //     var options = {
        //         title: 'Student Grades per Exam',
        //         legend: 'none',
        //         pieSliceText: 'label',
        //         slices: {  2: {offset: 0.2},
        //             5: {offset: 0.3},
        //             7: {offset: 0.4}
        //         },
        //     };
        //
        //     var chart = new google.visualization.PieChart(document.getElementById('columnchart_values'));
        //     chart.draw(data, options);
        //
        //
        //
        // }


        google.charts.load('current', {packages: ['corechart', 'bar']});
        google.charts.setOnLoadCallback(drawMaterial);

        function drawMaterial() {
            var data = new google.visualization.DataTable();
            //columns
            data.addColumn('string', 'Student Name');
            // data.addColumn('string', 'Exam Name');
            data.addColumn('string', 'University Name');
            data.addColumn('number', 'Grade');
            data.addColumn({ type: 'string', role: 'style' });

            var colors = ['#7400b8', '#6930c3', '#5e60ce', '#5390d9', '#4ea8de', '#48bfe3', '#56cfe1', '#64dfdf', '#72efdd', '#80ffdb']


            //data
            for (var i = 0; i < columnChartDto.length; i++) {
                const c = [
                    columnChartDto[i]._fullname,
                    // columnChartDto[i]._examname,
                    columnChartDto[i]._universityname,
                    columnChartDto[i]._grade,
                     colors[i]

                ];
                console.log(c)
                data.addRow(c);
            }
            var options = {
                title: 'Student Grades per Exam',
                legend: 'none',
                pieSliceText: 'label',
                slices: {
                    2: {offset: 0.2},
                    5: {offset: 0.3},
                    7: {offset: 0.4}
                },
                colors: ['#00203F','#ADEFD1']
            };

            var materialChart = new google.charts.Bar(document.getElementById('columnchart_values'));
            materialChart.draw(data, options);
        }
    }

    private forTable(tabledata: any) {
        google.charts.load('current', {'packages': ['table']});
        const drawTable = () => {
            var data = new google.visualization.DataTable();
            //
            // _coursename: "Justin"
            // _fullname: "Jamie Salas"
            // _grade: 100
            // _universityname: "Yerevan State University (1919)"
            // _yearid: 1999

            //columns
            data.addColumn('string', 'Full Name');
            data.addColumn('string', 'Course Name');
            data.addColumn('string', 'University Name');
            data.addColumn('number', 'Grade');
            data.addColumn('string', 'Year');

            //data
            for (var i = 0; i < tabledata.length; i++) {
                const c = [tabledata[i]._fullname,
                    tabledata[i]._coursename,
                    tabledata[i]._universityname,
                    tabledata[i]._grade,
                    String(tabledata[i]._yearid)
                ];
                data.addRow(c);
            }


            var table = new google.visualization.Table(document.getElementById('table_report'));

            table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
        }
        google.charts.setOnLoadCallback(drawTable);

    }


    forHistogran(histogramDto: any) {

        //"_numberofstudents" int4, "_universityname" varchar
        google.charts.load('current', {packages: ['corechart', 'bar']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var data = new google.visualization.DataTable();

            var colors = ['#7400b8', '#6930c3', '#5e60ce', '#5390d9', '#4ea8de', '#48bfe3', '#56cfe1', '#64dfdf', '#72efdd', '#80ffdb']
            //columns
            data.addColumn('string', 'University Name');
            data.addColumn('number', 'Number Of Students');
            data.addColumn({role: "style"})

            //data
            for (var i = 0; i < histogramDto.length; i++) {
                const c = [
                    histogramDto[i]._universityname,
                    histogramDto[i]._numberofstudents,
                    colors[i]

                ];

                data.addRow(c);
            }
            // var options = {
            //     title: 'Number of students per university',
            //     legend: { position: 'top', maxLines: 2 }
            //
            //
            //
            // };

            var options = {
                title: 'Number of students per university',
                chartArea: {width: '70%'},
                hAxis: {
                    title: 'Count',
                    minValue: 80
                },
                vAxis: {
                    title: 'University'
                }
            };

            var chart = new google.visualization.BarChart(document.getElementById('histogram_report'));
            chart.draw(data, options);
        }

    }
}
