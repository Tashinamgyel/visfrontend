// import { DatePipe } from '@angular/common';
// import { Component, OnInit, ViewChild } from '@angular/core';
// import { NotificationService } from '@app/@core';
// import { SharedService } from '@app/vis/shared/services/shared.service';
// import Chart from 'chart.js/auto';
// // import ChartComponent from 'chart.js/auto';
// // import { Map } from 'leaflet';

// @Component({
//   selector: 'app-graphs',
//   templateUrl: './graphs.component.html',
//   styleUrls: ['./graphs.component.scss'],
//   providers: [DatePipe],
// })
// export class GraphsComponent implements OnInit {
//   @ViewChild('pieCanvas', { static: false }) pieCanvas: ChartComponent;
//   @ViewChild('pieCanvas2', { static: false }) pieCanvas2: ChartComponent;

//   @ViewChild('followupBar1', { static: false }) followupBar1: ChartComponent;
//   @ViewChild('followupBar2', { static: false }) followupBar2: ChartComponent;

//   pie1: any;
//   pie2: any;

//   myDate: Date;
//   current_date: any;
//   current_year: string;
//   fromDate: string;
//   toDate: string;

//   private map: Map;

//   constructor(private service: SharedService, private notification: NotificationService, public datepipe: DatePipe) {
//     this.myDate = new Date();
//     this.current_date = this.datepipe.transform(this.myDate, 'yyy-MM-dd');
//     this.current_year = this.datepipe.transform(this.myDate, 'yyy');
//     this.fromDate = String(this.current_year) + '-01-01';
//     this.toDate = String(this.current_year) + '-12-31';
//   }

//   ngOnInit(): void {
//     //this.flashBar1();
//   }

//   bumthangCaseRegistered: number = 0;
//   chukhaCaseRegistered: number = 0;
//   daganaCaseRegistered: number = 0;
//   gasaCaseRegistered: number = 0;
//   haaCaseRegistered: number = 0;
//   lhuentseCaseRegistered: number = 0;
//   monggarCaseRegistered: number = 0;
//   paroCaseRegistered: number = 0;
//   pemagatshelCaseRegistered: number = 0;
//   punakhaCaseRegistered: number = 0;
//   samdrupjongkharCaseRegistered: number = 0;
//   samtseCaseRegistered: number = 0;
//   sarpangCaseRegistered: number = 0;
//   thimphuCaseRegistered: number = 0;
//   trashigangCaseRegistered: number = 0;
//   trongsaCaseRegistered: number = 0;
//   tsirangCaseRegistered: number = 0;
//   trashiyangtseCaseRegistered: number = 0;
//   wangdueCaseRegistered: number = 0;
//   zhemgangCaseRegistered: number = 0;

//   flashBar1() {
//     this.service.getRegisteredCaseByDzongkhag(this.fromDate, this.toDate).subscribe((data) => {
//       for (var i = 0; i < data.length; i++) {
//         if (data[i].dzongkhag_name === 'Bumthang') {
//           this.bumthangCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Chukha') {
//           this.chukhaCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Dagana') {
//           this.daganaCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Gasa') {
//           this.gasaCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Haa') {
//           this.haaCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Lhuentse') {
//           this.lhuentseCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Monggar') {
//           this.monggarCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Paro') {
//           this.paroCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Pemagatshel') {
//           this.pemagatshelCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Punakha') {
//           this.punakhaCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Samdrupjongkhar') {
//           this.samdrupjongkharCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Samtse') {
//           this.samtseCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Sarpang') {
//           this.sarpangCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Thimphu') {
//           this.thimphuCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Trashigang') {
//           this.trashigangCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Trashiyangtse') {
//           this.trashiyangtseCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Trongsa') {
//           this.trongsaCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Tsirang') {
//           this.tsirangCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Wangdue') {
//           this.wangdueCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Zhemgang') {
//           this.zhemgangCaseRegistered = data[i].disease_count;
//         }
//       }

//       this.pie1 = new Chart('pieCanvas', {
//         type: 'bar',
//         data: {
//           labels: [
//             'Bumthang',
//             'Chukha',
//             'Dagana',
//             'Gasa',
//             'Haa',
//             'Lhuentse',
//             'Mongar',
//             'Paro',
//             'Pemagatshel',
//             'Punakha',
//             'Samdrupjongkhar',
//             'Samtse',
//             'Sarpang',
//             'Thimphu',
//             'Trashigang',
//             'Trashiyangtse',
//             'Trongsa',
//             'Tsirang',
//             'Wangdue Phodrang',
//             'Zhemgang',
//           ],
//           datasets: [
//             {
//               label: 'Registered Case',
//               data: [
//                 this.bumthangCaseRegistered,
//                 this.chukhaCaseRegistered,
//                 this.daganaCaseRegistered,
//                 this.gasaCaseRegistered,
//                 this.haaCaseRegistered,
//                 this.lhuentseCaseRegistered,
//                 this.monggarCaseRegistered,
//                 this.paroCaseRegistered,
//                 this.pemagatshelCaseRegistered,
//                 this.punakhaCaseRegistered,
//                 this.samdrupjongkharCaseRegistered,
//                 this.samtseCaseRegistered,
//                 this.sarpangCaseRegistered,
//                 this.thimphuCaseRegistered,
//                 this.trashigangCaseRegistered,
//                 this.trongsaCaseRegistered,
//                 this.tsirangCaseRegistered,
//                 this.trashiyangtseCaseRegistered,
//                 this.wangdueCaseRegistered,
//                 this.zhemgangCaseRegistered,
//               ],
//               backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//               ],
//               borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//               ],
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           scales: {},
//         },
//       });

//       this.pie1 = new Chart('pieCanvas', {
//         type: 'bar',
//         data: {
//           labels: [
//             'Bumthang',
//             'Chukha',
//             'Dagana',
//             'Gasa',
//             'Haa',
//             'Lhuentse',
//             'Mongar',
//             'Paro',
//             'Pemagatshel',
//             'Punakha',
//             'Samdrupjongkhar',
//             'Samtse',
//             'Sarpang',
//             'Thimphu',
//             'Trashigang',
//             'Trashiyangtse',
//             'Trongsa',
//             'Tsirang',
//             'Wangdue Phodrang',
//             'Zhemgang',
//           ],
//           datasets: [
//             {
//               label: 'Registered Case',
//               backgroundColor: [
//                 '#ff3d00',
//                 '#dd2c00',
//                 '#d7ccc8',
//                 '#bcaaa4',
//                 '#795548',
//                 '#d7ccc8',
//                 '#bcaaa4',
//                 '#8d6e63',
//                 '#eceff1',
//                 '#cfd8dc',
//                 '#b0bec5',
//                 '#90a4ae',
//                 '#78909c',
//                 '#607d8b',
//                 '#546e7a',
//                 '#cfd8dc',
//                 '#b0bec5',
//                 '#78909c',
//               ],

//               data: [
//                 this.bumthangCaseRegistered,
//                 this.chukhaCaseRegistered,
//                 this.daganaCaseRegistered,
//                 this.gasaCaseRegistered,
//                 this.haaCaseRegistered,
//                 this.lhuentseCaseRegistered,
//                 this.monggarCaseRegistered,
//                 this.paroCaseRegistered,
//                 this.pemagatshelCaseRegistered,
//                 this.punakhaCaseRegistered,
//                 this.samdrupjongkharCaseRegistered,
//                 this.samtseCaseRegistered,
//                 this.sarpangCaseRegistered,
//                 this.thimphuCaseRegistered,
//                 this.trashigangCaseRegistered,
//                 this.trongsaCaseRegistered,
//                 this.tsirangCaseRegistered,
//                 this.trashiyangtseCaseRegistered,
//                 this.wangdueCaseRegistered,
//                 this.zhemgangCaseRegistered,
//               ],
//               borderWidth: 1,
//             },
//           ],
//         },
//       });
//     });
//   }

//   flashBar2() {
//     this.service.getRegisteredCaseByDzongkhag(this.fromDate, this.toDate).subscribe((data) => {
//       for (var i = 0; i < data.length; i++) {
//         if (data[i].dzongkhag_name === 'Bumthang') {
//           this.bumthangCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Chukha') {
//           this.chukhaCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Dagana') {
//           this.daganaCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Gasa') {
//           this.gasaCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Haa') {
//           this.haaCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Lhuentse') {
//           this.lhuentseCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Monggar') {
//           this.monggarCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Paro') {
//           this.paroCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Pemagatshel') {
//           this.pemagatshelCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Punakha') {
//           this.punakhaCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Samdrupjongkhar') {
//           this.samdrupjongkharCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Samtse') {
//           this.samtseCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Sarpang') {
//           this.sarpangCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Thimphu') {
//           this.thimphuCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Trashigang') {
//           this.trashigangCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Trashiyangtse') {
//           this.trashiyangtseCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Trongsa') {
//           this.trongsaCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Tsirang') {
//           this.tsirangCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Wangdue') {
//           this.wangdueCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Zhemgang') {
//           this.zhemgangCaseRegistered = data[i].disease_count;
//         }
//       }

//       this.pie2 = new Chart('pieCanvas2', {
//         type: 'bar',
//         data: {
//           labels: [
//             'Bumthang',
//             'Chukha',
//             'Dagana',
//             'Gasa',
//             'Haa',
//             'Lhuentse',
//             'Mongar',
//             'Paro',
//             'Pemagatshel',
//             'Punakha',
//             'Samdrupjongkhar',
//             'Samtse',
//             'Sarpang',
//             'Thimphu',
//             'Trashigang',
//             'Trashiyangtse',
//             'Trongsa',
//             'Tsirang',
//             'Wangdue Phodrang',
//             'Zhemgang',
//           ],
//           datasets: [
//             {
//               label: '# of Votes',
//               data: [
//                 this.bumthangCaseRegistered,
//                 this.chukhaCaseRegistered,
//                 this.daganaCaseRegistered,
//                 this.gasaCaseRegistered,
//                 this.haaCaseRegistered,
//                 this.lhuentseCaseRegistered,
//                 this.monggarCaseRegistered,
//                 this.paroCaseRegistered,
//                 this.pemagatshelCaseRegistered,
//                 this.punakhaCaseRegistered,
//                 this.samdrupjongkharCaseRegistered,
//                 this.samtseCaseRegistered,
//                 this.sarpangCaseRegistered,
//                 this.thimphuCaseRegistered,
//                 this.trashigangCaseRegistered,
//                 this.trongsaCaseRegistered,
//                 this.tsirangCaseRegistered,
//                 this.trashiyangtseCaseRegistered,
//                 this.wangdueCaseRegistered,
//                 this.zhemgangCaseRegistered,
//               ],
//               backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//               ],
//               borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//               ],
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           scales: {},
//         },
//       });

//       this.pie1 = new Chart('pieCanvas', {
//         type: 'bar',
//         data: {
//           labels: [
//             'Bumthang',
//             'Chukha',
//             'Dagana',
//             'Gasa',
//             'Haa',
//             'Lhuentse',
//             'Mongar',
//             'Paro',
//             'Pemagatshel',
//             'Punakha',
//             'Samdrupjongkhar',
//             'Samtse',
//             'Sarpang',
//             'Thimphu',
//             'Trashigang',
//             'Trashiyangtse',
//             'Trongsa',
//             'Tsirang',
//             'Wangdue Phodrang',
//             'Zhemgang',
//           ],
//           datasets: [
//             {
//               label: 'Registered Case',
//               backgroundColor: [
//                 '#ff3d00',
//                 '#dd2c00',
//                 '#d7ccc8',
//                 '#bcaaa4',
//                 '#795548',
//                 '#d7ccc8',
//                 '#bcaaa4',
//                 '#8d6e63',
//                 '#eceff1',
//                 '#cfd8dc',
//                 '#b0bec5',
//                 '#90a4ae',
//                 '#78909c',
//                 '#607d8b',
//                 '#546e7a',
//                 '#cfd8dc',
//                 '#b0bec5',
//                 '#78909c',
//               ],

//               data: [
//                 this.bumthangCaseRegistered,
//                 this.chukhaCaseRegistered,
//                 this.daganaCaseRegistered,
//                 this.gasaCaseRegistered,
//                 this.haaCaseRegistered,
//                 this.lhuentseCaseRegistered,
//                 this.monggarCaseRegistered,
//                 this.paroCaseRegistered,
//                 this.pemagatshelCaseRegistered,
//                 this.punakhaCaseRegistered,
//                 this.samdrupjongkharCaseRegistered,
//                 this.samtseCaseRegistered,
//                 this.sarpangCaseRegistered,
//                 this.thimphuCaseRegistered,
//                 this.trashigangCaseRegistered,
//                 this.trongsaCaseRegistered,
//                 this.tsirangCaseRegistered,
//                 this.trashiyangtseCaseRegistered,
//                 this.wangdueCaseRegistered,
//                 this.zhemgangCaseRegistered,
//               ],
//               borderWidth: 1,
//             },
//           ],
//         },
//       });
//     });
//   }

//   followUpBarGraph1() {
//     this.service.getRegisteredCaseByDzongkhag(this.fromDate, this.toDate).subscribe((data) => {
//       console.log('data', data);
//       for (var i = 0; i < data.length; i++) {
//         if (data[i].dzongkhag_name === 'Bumthang') {
//           this.bumthangCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Chukha') {
//           this.chukhaCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Dagana') {
//           this.daganaCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Gasa') {
//           this.gasaCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Haa') {
//           this.haaCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Lhuentse') {
//           this.lhuentseCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Monggar') {
//           this.monggarCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Paro') {
//           this.paroCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Pemagatshel') {
//           this.pemagatshelCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Punakha') {
//           this.punakhaCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Samdrupjongkhar') {
//           this.samdrupjongkharCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Samtse') {
//           this.samtseCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Sarpang') {
//           this.sarpangCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Thimphu') {
//           this.thimphuCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Trashigang') {
//           this.trashigangCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Trashiyangtse') {
//           this.trashiyangtseCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Trongsa') {
//           this.trongsaCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Tsirang') {
//           this.tsirangCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Wangdue') {
//           this.wangdueCaseRegistered = data[i].disease_count;
//         }
//         if (data[i].dzongkhag_name === 'Zhemgang') {
//           this.zhemgangCaseRegistered = data[i].disease_count;
//         }
//       }
//       this.pie1 = new Chart('followupBar1', {
//         type: 'bar',
//         data: {
//           labels: [
//             'Bumthang',
//             'Chukha',
//             'Dagana',
//             'Gasa',
//             'Haa',
//             'Lhuentse',
//             'Mongar',
//             'Paro',
//             'Pemagatshel',
//             'Punakha',
//             'Samdrupjongkhar',
//             'Samtse',
//             'Sarpang',
//             'Thimphu',
//             'Trashigang',
//             'Trashiyangtse',
//             'Trongsa',
//             'Tsirang',
//             'Wangdue Phodrang',
//             'Zhemgang',
//           ],
//           datasets: [
//             {
//               backgroundColor: [
//                 '#ff3d00',
//                 '#dd2c00',
//                 '#d7ccc8',
//                 '#bcaaa4',
//                 '#795548',
//                 '#d7ccc8',
//                 '#bcaaa4',
//                 '#8d6e63',
//                 '#eceff1',
//                 '#cfd8dc',
//                 '#b0bec5',
//                 '#90a4ae',
//                 '#78909c',
//                 '#607d8b',
//                 '#546e7a',
//                 '#cfd8dc',
//                 '#b0bec5',
//                 '#78909c',
//               ],

//               data: [
//                 this.bumthangCaseRegistered,
//                 this.chukhaCaseRegistered,
//                 this.daganaCaseRegistered,
//                 this.gasaCaseRegistered,
//                 this.haaCaseRegistered,
//                 this.lhuentseCaseRegistered,
//                 this.monggarCaseRegistered,
//                 this.paroCaseRegistered,
//                 this.pemagatshelCaseRegistered,
//                 this.punakhaCaseRegistered,
//                 this.samdrupjongkharCaseRegistered,
//                 this.samtseCaseRegistered,
//                 this.sarpangCaseRegistered,
//                 this.thimphuCaseRegistered,
//                 this.trashigangCaseRegistered,
//                 this.trongsaCaseRegistered,
//                 this.tsirangCaseRegistered,
//                 this.trashiyangtseCaseRegistered,
//                 this.wangdueCaseRegistered,
//                 this.zhemgangCaseRegistered,
//               ],
//             },
//           ],
//         },
//       });
//     });
//   }

//   followUpBarGraph2() {
//     this.pie2 = new Chart('followupBar2', {
//       type: 'bar',
//       data: {
//         labels: [
//           'Bumthang',
//           'Chukha',
//           'Dagana',
//           'Gasa',
//           'Haa',
//           'Lhuentse',
//           'Mongar',
//           'Paro',
//           'Pemagatshel',
//           'Punakha',
//           'Samdrupjongkhar',
//           'Samtse',
//           'Sarpang',
//           'Thimphu',
//           'Trashigang',
//           'Trashiyangtse',
//           'Trongsa',
//           'Tsirang',
//           'Wangdue Phodrang',
//           'Zhemgang',
//         ],
//         datasets: [
//           {
//             backgroundColor: [
//               '#ff3d00',
//               '#dd2c00',
//               '#d7ccc8',
//               '#bcaaa4',
//               '#795548',
//               '#d7ccc8',
//               '#bcaaa4',
//               '#8d6e63',
//               '#eceff1',
//               '#cfd8dc',
//               '#b0bec5',
//               '#90a4ae',
//               '#78909c',
//               '#607d8b',
//               '#546e7a',
//               '#cfd8dc',
//               '#b0bec5',
//               '#78909c',
//             ],
//             data: [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2],
//           },
//         ],
//       },
//     });
//   }
// }
