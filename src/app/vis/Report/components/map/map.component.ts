// import { DatePipe } from '@angular/common';
// import { Component, AfterViewInit } from '@angular/core';
// import { NotificationService } from '@app/@core';
// import { SharedService } from '@app/vis/shared/services/shared.service';
// // import * as L from 'leaflet';
// // import { icon, Marker } from 'leaflet';

// @Component({
//   selector: 'app-map',
//   templateUrl: './map.component.html',
//   styleUrls: ['./map.component.scss'],
//   providers: [DatePipe],
// })
// export class MapComponent implements AfterViewInit {
//   private map: any;

//   private initMap(): void {
//     this.map = L.map('map').setView([27.417, 90.435], 8.4);
//     let BhutanMap = L.tileLayer(
//       'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
//       {
//         attribution: 'Bhutan Map',
//         maxZoom: 16,
//       }
//     );
//     BhutanMap.addTo(this.map);
//   }

//   myDate: Date;
//   current_date: any;
//   current_year: string;
//   fromDate: string;
//   toDate: string;

//   constructor(private service: SharedService, private notification: NotificationService, public datepipe: DatePipe) {
//     this.myDate = new Date();
//     this.current_date = this.datepipe.transform(this.myDate, 'yyy-MM-dd');
//     this.current_year = this.datepipe.transform(this.myDate, 'yyy');
//     this.fromDate = String(this.current_year) + '-01-01';
//     this.toDate = String(this.current_year) + '-12-31';
//   }

//   ngAfterViewInit(): void {
//     this.initMap();
//     //this.getDataForMap();
//   }

//   getDataForMap() {
//     const iconRetinaUrl = 'assets/marker-icon-2x.png';
//     const iconUrl = 'assets/marker-icon.png';
//     const shadowUrl = 'assets/marker-shadow.png';
//     const iconDefault = icon({
//       iconRetinaUrl,
//       iconUrl,
//       shadowUrl,
//       iconSize: [25, 41],
//       iconAnchor: [12, 41],
//       popupAnchor: [1, -34],
//       tooltipAnchor: [16, -28],
//       shadowSize: [41, 41],
//     });
//     Marker.prototype.options.icon = iconDefault;
//     this.service.getMapData(this.fromDate, this.toDate).subscribe((data) => {
//       for (let i = 0; i < data.length; i++) {
//         if (data[i].dzongkhag_name === 'Bumthang') {
//           let diseaseList = String(data[i].disease_name).split(',');
//           let disease = diseaseList.join(' <br> ');
//           L.marker([27.75, 90.666667])
//             .addTo(this.map)
//             .bindPopup('<b>Bumthang</b>' + '<br>' + disease)
//             .openPopup();
//         } else if (data[i].dzongkhag_name === 'Chukha') {
//           let diseaseList = String(data[i].disease_name).split(',');
//           let disease = diseaseList.join(' <br> ');
//           L.marker([27.066667, 89.583333])
//             .addTo(this.map)
//             .bindPopup('<b>Chukha</b>' + '<br>' + disease)
//             .openPopup();
//         } else if (data[i].dzongkhag_name === 'Dagana') {
//           let diseaseList = String(data[i].disease_name).split(',');
//           let disease = diseaseList.join(' <br> ');
//           L.marker([27, 89.916667])
//             .addTo(this.map)
//             .bindPopup('<b>Dagana</b>' + '<br>' + disease)
//             .openPopup();
//         } else if (data[i].dzongkhag_name === 'Gasa') {
//           let diseaseList = String(data[i].disease_name).split(',');
//           let disease = diseaseList.join(' <br> ');
//           L.marker([27.916667, 89.683333])
//             .addTo(this.map)
//             .bindPopup('<b>Gasa</b>' + '<br>' + disease)
//             .openPopup();
//         } else if (data[i].dzongkhag_name === 'Haa') {
//           let diseaseList = String(data[i].disease_name).split(',');
//           let disease = diseaseList.join(' <br> ');
//           L.marker([27.25, 89.166667])
//             .addTo(this.map)
//             .bindPopup('<b>Haa</b>' + '<br>' + disease)
//             .openPopup();
//         } else if (data[i].dzongkhag_name === 'Lhuentse') {
//           let diseaseList = String(data[i].disease_name).split(',');
//           let disease = diseaseList.join(' <br> ');
//           L.marker([27.666667, 91])
//             .addTo(this.map)
//             .bindPopup('<b>Lhuentse</b>' + '<br>' + disease)
//             .openPopup();
//         } else if (data[i].dzongkhag_name === 'Mongar') {
//           let diseaseList = String(data[i].disease_name).split(',');
//           let disease = diseaseList.join(' <br> ');
//           L.marker([27.166667, 91.166667])
//             .addTo(this.map)
//             .bindPopup('<b>Mongar</b>' + '<br>' + disease)
//             .openPopup();
//         } else if (data[i].dzongkhag_name === 'Paro') {
//           let diseaseList = String(data[i].disease_name).split(',');
//           let disease = diseaseList.join(' <br> ');
//           L.marker([27.433333, 89.416667])
//             .addTo(this.map)
//             .bindPopup('<b>Paro</b>' + '<br>' + disease)
//             .openPopup();
//         } else if (data[i].dzongkhag_name === 'Pemagatshel') {
//           let diseaseList = String(data[i].disease_name).split(',');
//           let disease = diseaseList.join(' <br> ');
//           L.marker([27, 91.25])
//             .addTo(this.map)
//             .bindPopup('<b>Pemagatshel</b>' + '<br>' + disease)
//             .openPopup();
//         } else if (data[i].dzongkhag_name === 'Punakha') {
//           let diseaseList = String(data[i].disease_name).split(',');
//           let disease = diseaseList.join(' <br> ');
//           L.marker([27.666667, 89.833333])
//             .addTo(this.map)
//             .bindPopup('<b>Punakha</b>' + '<br>' + disease)
//             .openPopup();
//         } else if (data[i].dzongkhag_name === 'Samdrupjongkhar') {
//           let diseaseList = String(data[i].disease_name).split(',');
//           let disease = diseaseList.join(' <br> ');
//           L.marker([26.916667, 91.616667])
//             .addTo(this.map)
//             .bindPopup('<b>Samdrupjongkhar</b>' + '<br>' + disease)
//             .openPopup();
//         } else if (data[i].dzongkhag_name === 'Samtse') {
//           let diseaseList = String(data[i].disease_name).split(',');
//           let disease = diseaseList.join(' <br> ');
//           L.marker([27, 89.083333])
//             .addTo(this.map)
//             .bindPopup('<b>Samtse</b>' + '<br>' + disease)
//             .openPopup();
//         } else if (data[i].dzongkhag_name === 'Sarpang') {
//           let diseaseList = String(data[i].disease_name).split(',');
//           let disease = diseaseList.join(' <br> ');
//           L.marker([26.833333, 90.25])
//             .addTo(this.map)
//             .bindPopup('<b>Sarpang</b>' + '<br>' + disease)
//             .openPopup();
//         } else if (data[i].dzongkhag_name === 'Thimphu') {
//           let diseaseList = String(data[i].disease_name).split(',');
//           let disease = diseaseList.join(' <br> ');
//           L.marker([27.472222, 89.636111])
//             .addTo(this.map)
//             .bindPopup('<b>Thimphu</b>' + '<br>' + disease)
//             .openPopup();
//         } else if (data[i].dzongkhag_name === 'Trashigang') {
//           let diseaseList = String(data[i].disease_name).split(',');
//           let disease = diseaseList.join(' <br> ');
//           L.marker([27.25, 91.666667])
//             .addTo(this.map)
//             .bindPopup('<b>Trashigang</b>' + '<br>' + disease)
//             .openPopup();
//         } else if (data[i].dzongkhag_name === 'Trashiyangtse') {
//           let diseaseList = String(data[i].disease_name).split(',');
//           let disease = diseaseList.join(' <br> ');
//           L.marker([27.666667, 91.416667])
//             .addTo(this.map)
//             .bindPopup('<b>Trashiyangtse</b>' + '<br>' + disease)
//             .openPopup();
//         } else if (data[i].dzongkhag_name === 'Trongsa') {
//           let diseaseList = String(data[i].disease_name).split(',');
//           let disease = diseaseList.join(' <br> ');
//           L.marker([27.333333, 90.416667])
//             .addTo(this.map)
//             .bindPopup('<b>Trongsa</b>' + '<br>' + disease)
//             .openPopup();
//         } else if (data[i].dzongkhag_name === 'Tsirang') {
//           let diseaseList = String(data[i].disease_name).split(',');
//           let disease = diseaseList.join(' <br> ');
//           L.marker([26.916667, 90.083333])
//             .addTo(this.map)
//             .bindPopup('<b>Tsirang</b>' + '<br>' + disease)
//             .openPopup();
//         } else if (data[i].dzongkhag_name === 'Wangdue Phodrang') {
//           let diseaseList = String(data[i].disease_name).split(',');
//           let disease = diseaseList.join(' <br> ');
//           L.marker([27.5, 90.166667])
//             .addTo(this.map)
//             .bindPopup('<b>Wangdue Phodrang</b>' + '<br>' + disease)
//             .openPopup();
//         } else if (data[i].dzongkhag_name === 'Zhemgang') {
//           let diseaseList = String(data[i].disease_name).split(',');
//           let disease = diseaseList.join(' <br> ');
//           L.marker([27, 90.75])
//             .addTo(this.map)
//             .bindPopup('<b>Zhemgang</b>' + '<br>' + disease)
//             .openPopup();
//         }
//       }
//     });
//   }
// }
