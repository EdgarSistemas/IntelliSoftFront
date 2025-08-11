import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import {
  ChartConfiguration,
  ChartOptions,
  ChartType,
  ChartData,
} from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  // ========= Utils =========
  private lastNMonths(n = 12): string[] {
    const out: string[] = [];
    const d = new Date();
    d.setDate(1);
    for (let i = n - 1; i >= 0; i--) {
      const dt = new Date(d.getFullYear(), d.getMonth() - i, 1);
      out.push(
        `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`
      );
    }
    return out;
  }
  private alignSeries(
    labels: string[],
    data: { periodo: string; valor: number }[]
  ) {
    const map = new Map(data.map((d) => [d.periodo, Number(d.valor) || 0]));
    return labels.map((l) => map.get(l) ?? 0);
  }
  private currency(n: number) {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(n || 0);
  }
  private safeArray<T = any>(x: any, fallback: T[] = []): T[] {
    if (Array.isArray(x)) return x;
    if (x?.data && Array.isArray(x.data)) return x.data;
    return fallback;
  }

  // ========= Opciones generales =========
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (ctx) => {
            const label = ctx.dataset.label ?? '';
            const v = (ctx.parsed?.y ?? ctx.parsed) as number;
            const isMoney = /ingreso/i.test(label);
            return ` ${label}: ${isMoney ? this.currency(v) : v}`;
          },
        },
      },
    },
    elements: {
      line: { tension: 0.35 },
      point: { radius: 4, hitRadius: 12 },
    },
    scales: {
      x: {
        ticks: { autoSkip: true, maxRotation: 0 },
        grid: { display: false },
      },
      y: { beginAtZero: true, grid: { display: true } },
      y1: {
        beginAtZero: true,
        position: 'right',
        grid: { drawOnChartArea: false },
      },
    },
  };

  // ========= Loaders =========
  loading = {
    estatus: true,
    ingresos: true,
    pedidosMensuales: true,
    topProductos: true,
    topClientes: true,
    conversion: true,
    calificados: true,
    opiniones: true,
  };

  // ========= Pedidos por estatus (doughnut) =========
  pedidosChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#90CAF9', '#FFE082', '#80DEEA', '#A5D6A7'],
      },
    ],
  };
  pedidosChartType: ChartType = 'doughnut';

  // ========= Ingresos mensuales (mixed chart) =========
  ingresosMensualesData: ChartData<'bar' | 'line'> = {
    labels: [],
    datasets: [
      { type: 'bar', data: [], label: 'Ingresos', yAxisID: 'y1' },
      { type: 'line', data: [], label: 'Tendencia', yAxisID: 'y1' },
    ],
  };
  ingresosMensualesType: ChartType = 'bar';

  // ========= Pedidos mensuales (bar) =========
  pedidosMensualesData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Pedidos' }],
  };
  pedidosMensualesType: ChartType = 'bar';

  // ========= Top productos (bar) - por ingreso =========
  productosVendidosChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Ingresos', backgroundColor: '#66BB6A' }],
  };
  productosVendidosChartType: ChartType = 'bar';

  // ========= Top clientes (bar) - por ingreso =========
  topClientesChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Ingreso', backgroundColor: '#AB47BC' }],
  };
  topClientesChartType: ChartType = 'bar';

  // ========= Conversión (doughnut) =========
  conversionChartData: ChartData<'doughnut'> = {
    labels: ['Pedidos', 'Resto (No convertidas)'],
    datasets: [{ data: [0, 0], backgroundColor: ['#42A5F5', '#E0E0E0'] }],
  };
  conversionChartType: ChartType = 'doughnut';
  conversionTexto = '0%';

  // ========= Productos mejor calificados (bar) =========
  productosCalificadosChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Calificación promedio', backgroundColor: '#FFA726' },
    ],
  };
  productosCalificadosChartType: ChartType = 'bar';

  // ========= Distribución de opiniones (bar) =========
  opinionesChartData: ChartData<'bar'> = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        data: [0, 0, 0, 0, 0],
        label: 'Cantidad de opiniones',
        backgroundColor: '#42A5F5',
      },
    ],
  };
  opinionesChartType: ChartType = 'bar';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.cargarPedidosPorEstatus();
    this.cargarIngresosMensuales();
    this.cargarPedidosMensuales();
    this.cargarTopProductos();
    this.cargarTopClientes();
    this.cargarConversion();
    this.cargarMejorCalificados();
    this.cargarDistribucionOpiniones();
  }

  // ========= Cargas =========

  cargarPedidosPorEstatus(): void {
    this.loading.estatus = true;
    this.dashboardService.obtenerPedidosPorEstatus().subscribe({
      next: (data) => {
        const arr = this.safeArray(data);
        this.pedidosChartData = {
          labels: arr.map((i: any) => i.estatusNombre ?? '—'),
          datasets: [
            {
              data: arr.map((i: any) => i.total ?? 0),
              backgroundColor: ['#90CAF9', '#FFE082', '#80DEEA', '#A5D6A7'],
            },
          ],
        };
        this.loading.estatus = false;
      },
      error: () => {
        this.pedidosChartData = {
          labels: ['Sin datos'],
          datasets: [{ data: [0] }],
        };
        this.loading.estatus = false;
      },
    });
  }

  cargarIngresosMensuales(): void {
    this.loading.ingresos = true;
    const labels = this.lastNMonths(12);

    this.dashboardService.obtenerIngresosMensuales().subscribe({
      next: (data) => {
        const arr = this.safeArray<{ periodo: string; valor: number }>(data);
        const series = this.alignSeries(labels, arr);

        this.ingresosMensualesData = {
          labels,
          datasets: [
            { type: 'bar', data: series, label: 'Ingresos', yAxisID: 'y1' },
            { type: 'line', data: series, label: 'Tendencia', yAxisID: 'y1' },
          ],
        };
        this.loading.ingresos = false;
      },
      error: () => {
        this.ingresosMensualesData = {
          labels,
          datasets: [
            {
              type: 'bar',
              data: labels.map(() => 0),
              label: 'Ingresos',
              yAxisID: 'y1',
            },
            {
              type: 'line',
              data: labels.map(() => 0),
              label: 'Tendencia',
              yAxisID: 'y1',
            },
          ],
        };
        this.loading.ingresos = false;
      },
    });
  }

  cargarPedidosMensuales(): void {
    this.loading.pedidosMensuales = true;
    const labels = this.lastNMonths(12);

    this.dashboardService.obtenerPedidosMensuales().subscribe({
      next: (data) => {
        const arr = this.safeArray<{ periodo: string; valor: number }>(data);
        const series = this.alignSeries(labels, arr);

        this.pedidosMensualesData = {
          labels,
          datasets: [{ data: series, label: 'Pedidos' }],
        };
        this.loading.pedidosMensuales = false;
      },
      error: () => {
        this.pedidosMensualesData = {
          labels,
          datasets: [{ data: labels.map(() => 0), label: 'Pedidos' }],
        };
        this.loading.pedidosMensuales = false;
      },
    });
  }

  cargarTopProductos(): void {
    this.loading.topProductos = true;
    this.dashboardService
      .obtenerTopProductos({ metric: 'ingreso', take: 10 })
      .subscribe({
        next: (resp) => {
          const arr = this.safeArray(resp, [
            { nombreProducto: 'Sin datos', totalVendido: 0 },
          ]);
          this.productosVendidosChartData = {
            labels: arr.map((i: any) => i.nombreProducto ?? 'Producto'),
            datasets: [
              {
                data: arr.map((i: any) => i.totalVendido ?? 0),
                label: 'Ingresos',
                backgroundColor: '#66BB6A',
              },
            ],
          };
          this.loading.topProductos = false;
        },
        error: () => {
          this.productosVendidosChartData = {
            labels: ['Error'],
            datasets: [
              {
                data: [0],
                label: 'Datos no disponibles',
                backgroundColor: '#FF6384',
              },
            ],
          };
          this.loading.topProductos = false;
        },
      });
  }

  cargarTopClientes(): void {
    this.loading.topClientes = true;
    this.dashboardService.obtenerClientesTop({ take: 10 }).subscribe({
      next: (resp) => {
        const arr = this.safeArray(resp, [
          { nombreCliente: 'Sin datos', ingreso: 0 },
        ]);
        this.topClientesChartData = {
          labels: arr.map((i: any) => i.nombreCliente ?? 'Cliente'),
          datasets: [
            {
              data: arr.map((i: any) => i.ingreso ?? 0),
              label: 'Ingreso',
              backgroundColor: '#AB47BC',
            },
          ],
        };
        this.loading.topClientes = false;
      },
      error: () => {
        this.topClientesChartData = {
          labels: ['Error'],
          datasets: [
            {
              data: [0],
              label: 'Datos no disponibles',
              backgroundColor: '#FF6384',
            },
          ],
        };
        this.loading.topClientes = false;
      },
    });
  }

  cargarConversion(): void {
    this.loading.conversion = true;
    this.dashboardService.obtenerConversion().subscribe({
      next: (res) => {
        const cot = Math.max(0, res?.cotizaciones ?? 0);
        const ped = Math.max(0, res?.pedidos ?? 0);
        const resto = Math.max(0, cot - ped);
        const conv = cot > 0 ? ped / cot : 0;
        this.conversionTexto = `${(conv * 100).toFixed(0)}%`;

        this.conversionChartData = {
          labels: ['Pedidos', 'Resto (No convertidas)'],
          datasets: [
            { data: [ped, resto], backgroundColor: ['#42A5F5', '#E0E0E0'] },
          ],
        };
        this.loading.conversion = false;
      },
      error: () => {
        this.conversionTexto = '0%';
        this.conversionChartData = {
          labels: ['Pedidos', 'Resto'],
          datasets: [{ data: [0, 0] }],
        };
        this.loading.conversion = false;
      },
    });
  }

  cargarMejorCalificados(): void {
    this.loading.calificados = true;
    this.dashboardService.obtenerProductosMejorCalificados().subscribe({
      next: (data) => {
        const arr = this.safeArray(data);
        this.productosCalificadosChartData = {
          labels: arr.map((i: any) => i.nombreProducto ?? 'Producto'),
          datasets: [
            {
              data: arr.map((i: any) => i.promedioCalificacion ?? 0),
              label: 'Calificación promedio',
              backgroundColor: '#FFA726',
            },
          ],
        };
        this.loading.calificados = false;
      },
      error: () => {
        this.productosCalificadosChartData = {
          labels: ['Sin datos'],
          datasets: [{ data: [0], label: 'Calificación promedio' }],
        };
        this.loading.calificados = false;
      },
    });
  }

  cargarDistribucionOpiniones(): void {
    this.loading.opiniones = true;
    this.dashboardService.obtenerDistribucionOpiniones().subscribe({
      next: (data) => {
        const base = [0, 0, 0, 0, 0];
        const arr = this.safeArray(data);
        arr.forEach((i: any) => {
          const idx = (Number(i.calificacion) || 0) - 1;
          if (idx >= 0 && idx < 5) base[idx] = Number(i.total) || 0;
        });
        this.opinionesChartData = {
          labels: ['1', '2', '3', '4', '5'],
          datasets: [
            {
              data: base,
              label: 'Cantidad de opiniones',
              backgroundColor: '#42A5F5',
            },
          ],
        };
        this.loading.opiniones = false;
      },
      error: () => {
        this.opinionesChartData = {
          labels: ['1', '2', '3', '4', '5'],
          datasets: [{ data: [0, 0, 0, 0, 0], label: 'Cantidad de opiniones' }],
        };
        this.loading.opiniones = false;
      },
    });
  }
}