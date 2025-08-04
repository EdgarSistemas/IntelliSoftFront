import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ChartConfiguration, ChartOptions, ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone:false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  // Pedidos por estatus (doughnut)
  pedidosChartLabels: string[] = [];
  pedidosChartData: ChartData<'doughnut'> = { labels: [], datasets: [{ data: [] }] };
  pedidosChartType: ChartType = 'doughnut';

  // Distribución opiniones (barra)
  opinionesChartLabels: string[] = ['1', '2', '3', '4', '5'];
  opinionesChartData: ChartData<'bar'> = {
    labels: this.opinionesChartLabels,
    datasets: [{ data: [0, 0, 0, 0, 0], label: 'Cantidad de opiniones', backgroundColor: '#42A5F5' }],
  };
  opinionesChartType: ChartType = 'bar';

  // Productos más vendidos (barra)
  productosVendidosChartLabels: string[] = [];
  productosVendidosChartData: ChartData<'bar'> = { labels: [], datasets: [{ data: [], label: 'Cantidad vendida', backgroundColor: '#66BB6A' }] };
  productosVendidosChartType: ChartType = 'bar';

  // Productos mejor calificados (barra)
  productosCalificadosChartLabels: string[] = [];
  productosCalificadosChartData: ChartData<'bar'> = { labels: [], datasets: [{ data: [], label: 'Calificación promedio', backgroundColor: '#FFA726' }] };
  productosCalificadosChartType: ChartType = 'bar';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.obtenerPedidosPorEstatus();
    this.obtenerDistribucionOpiniones();
    this.obtenerProductosMasVendidos();
    this.obtenerProductosMejorCalificados();
  }

  obtenerPedidosPorEstatus() {
    this.dashboardService.obtenerPedidosPorEstatus().subscribe((data) => {
      this.pedidosChartLabels = data.map((item: any) => item.estatusNombre);
      this.pedidosChartData = {
        labels: this.pedidosChartLabels,
        datasets: [
          {
            data: data.map((item: any) => item.total),
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#EF5350'],
          },
        ],
      };
    });
  }

  obtenerDistribucionOpiniones() {
    this.dashboardService.obtenerDistribucionOpiniones().subscribe((data) => {
      const valores = [0, 0, 0, 0, 0];
      data.forEach((item: any) => {
        const index = parseInt(item.calificacion) - 1;
        if (index >= 0 && index < 5) {
          valores[index] = item.total;
        }
      });
      this.opinionesChartData = {
        labels: this.opinionesChartLabels,
        datasets: [{ data: valores, label: 'Cantidad de opiniones', backgroundColor: '#42A5F5' }],
      };
    });
  }

  obtenerProductosMasVendidos() {
    this.dashboardService.obtenerProductosMasVendidos().subscribe((data) => {
      this.productosVendidosChartLabels = data.map((item: any) => item.nombreProducto);
      this.productosVendidosChartData = {
        labels: this.productosVendidosChartLabels,
        datasets: [
          {
            data: data.map((item: any) => item.totalVendido),
            label: 'Cantidad vendida',
            backgroundColor: '#66BB6A',
          },
        ],
      };
    });
  }

  obtenerProductosMejorCalificados() {
    this.dashboardService.obtenerProductosMejorCalificados().subscribe((data) => {
      this.productosCalificadosChartLabels = data.map((item: any) => item.nombreProducto);
      this.productosCalificadosChartData = {
        labels: this.productosCalificadosChartLabels,
        datasets: [
          {
            data: data.map((item: any) => item.promedioCalificacion),
            label: 'Calificación promedio',
            backgroundColor: '#FFA726',
          },
        ],
      };
    });
  }
}