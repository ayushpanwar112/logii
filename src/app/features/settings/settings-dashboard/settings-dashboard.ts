import { Component, AfterViewInit, ElementRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';

type Variant = 'blue' | 'pink' | 'orange';

@Component({
	selector: 'app-settings-dashboard',
	standalone: true,
	imports: [CommonModule, BaseChartDirective],
	templateUrl: './settings-dashboard.html',
	styleUrl: './settings-dashboard.scss'
})
export class SettingsDashboard implements AfterViewInit {
	constructor(private host: ElementRef<HTMLElement>, private zone: NgZone) {
		try { Chart.register(...registerables); } catch {}
	}
	kpis: Array<{
		title: string;
		amount: number;
		variant: Variant;
		data: number[];
	}> = [
		{ title: 'Amount processed', variant: 'blue',   amount: 23567, data: [2, 3, 2.2, 4, 3.2, 3.1, 5.2, 6.5] },
		{ title: 'Amount spent',     variant: 'pink',   amount: 14552, data: [1, 1.8, 1.2, 2.5, 2.1, 3.5, 3.4, 3.9] },
		{ title: 'Profit processed', variant: 'orange', amount: 31156, data: [1.2, 2.6, 2.0, 2.8, 3.1, 2.9, 4.2, 3.6] }
	];

	// Traffic resources list with tiny sparklines
	trafficMetrics: Array<{ label: string; value: number; data: number[]; color: string }> = [
		{ label: 'Unique visitors', value: 4562, data: [2,3,2.8,3.5,3.8,4.2,4.1], color: '#6366f1' },
		{ label: 'Page Views', value: 679, data: [1.2,1.4,1.6,1.7,1.6,1.8,1.9], color: '#ef5a87' },
		{ label: 'Page/Visit', value: 2516, data: [2.1,2.3,2.2,2.4,2.5,2.6,2.6], color: '#22c55e' },
		{ label: 'Bounce rate', value: 67, data: [2.1,1.9,2.0,2.1,2.0,2.2,2.1], color: '#f59e0b' },
		{ label: 'Visit', value: 845, data: [1.0,1.4,1.3,1.6,1.5,1.8,1.7], color: '#ef4444' }
	];

	// Reviews list
	reviews = [
		{ name: 'Josephin Doe', text: 'Lorem ipsum dolor', date: '04 Jan | 10:45 AM', rating: 1 },
		{ name: 'Josephin Doe', text: 'Lorem ipsum dolor sit amet', date: '04 Jan | 10:45 AM', rating: 5 },
		{ name: 'Luciano Durk', text: 'Lorem ipsum dolor sit amet, consectetur', date: '04 Jan | 10:45 AM', rating: 3 },
		{ name: 'Luciano Durk', text: 'Lorem ipsum amet, consectetur', date: '04 Jan | 10:45 AM', rating: 4 }
	];

	// Stat tiles
	statTiles = [
		{ color: '#6366f1', icon: 'users', value: 2672, label: "Last week user's" },
		{ color: '#ef5a87', icon: 'nodes', value: 3619, label: 'New Order Received' },
		{ color: '#22c55e', icon: 'wallet', amount: 6391, label: 'Total earning' },
		{ color: '#f59e0b', icon: 'people', value: 9276, label: 'Today New Visitors' }
	];

	balance = { amount: 167.2, note: 'Payment of next month', progress: 32 };

	// Combined chart (bars + dashed line)
	private salesLabels = ['Jan 16', 'Jan 17', 'Jan 18', 'Jan 19', 'Jan 20', 'Jan 21', 'Jan 22'];
	salesData: ChartData<'bar' | 'line'> = {
		labels: this.salesLabels,
		datasets: [
			{ type: 'bar', label: 'Actual', data: [8, 6, 2, 9, 6, 5, 7], backgroundColor: '#6366f1', borderRadius: 6, barPercentage: 0.6, categoryPercentage: 0.5 },
			{ type: 'bar', label: 'Target', data: [5, 4, 5, 8, 9, 3, 5], backgroundColor: '#ef5a87', borderRadius: 6, barPercentage: 0.6, categoryPercentage: 0.5 },
			{ type: 'bar', label: 'Projected', data: [8, 6, 2, 9, 6, 5, 7], backgroundColor: '#f59e0b', borderRadius: 6, barPercentage: 0.6, categoryPercentage: 0.5 },
			{ type: 'line', label: 'Market Days', data: [8.5, 1.6, 3, 6, 5.2, 5.0, 3.2], borderColor: '#84cc16', borderDash: [6, 6], tension: 0.35, pointRadius: 0, fill: false }
		]
	};

	salesOptions: ChartOptions<'bar' | 'line'> = {
		responsive: true,
		maintainAspectRatio: false,
		animation: { duration: 900, easing: 'easeOutQuart' },
		animations: { borderDashOffset: { from: 20, to: 0, duration: 1200, easing: 'easeOutQuad' } } as any,
		plugins: {
			legend: { display: false },
			tooltip: {
				mode: 'index',
				intersect: false,
				callbacks: {
					label: (ctx) => {
						const val = typeof ctx.parsed.y === 'number' ? ctx.parsed.y : 0;
						return `${ctx.dataset.label}: ${val.toLocaleString()}`;
					}
				}
			}
		},
		scales: {
			x: {
				display: true,
				grid: { display: false },
				ticks: { color: '#6b7280' }
			},
			y: {
				beginAtZero: true,
				grid: { color: 'rgba(2,6,23,0.06)' },
				ticks: { color: '#6b7280' }
			}
		}
	};

	ngAfterViewInit(): void {
		// IntersectionObserver to reveal elements and start counters
		const root = this.host.nativeElement;
		const toReveal = Array.from(root.querySelectorAll<HTMLElement>('.reveal'));
		const io = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('in');
					this.startCounts(entry.target as HTMLElement);
					io.unobserve(entry.target);
				}
			});
		}, { threshold: 0.15 });
		toReveal.forEach(el => io.observe(el));
	}

	private startCounts(scope: HTMLElement) {
		const counters = Array.from(scope.querySelectorAll<HTMLElement>('.count[data-to]'));
		counters.forEach((el) => {
			const to = Number(el.getAttribute('data-to') || '0');
			const isCurrency = el.classList.contains('currency');
			this.animateCount(el, 0, to, 900, isCurrency);
		});
	}

	private animateCount(el: HTMLElement, from: number, to: number, duration = 800, currency = false) {
		const start = performance.now();
		const delta = to - from;
		const format = (v: number) => currency ? `$${Math.round(v).toLocaleString()}` : Math.round(v).toLocaleString();
		this.zone.runOutsideAngular(() => {
			const step = (t: number) => {
				const p = Math.min(1, (t - start) / duration);
				const ease = 1 - Math.pow(1 - p, 3);
				el.textContent = format(from + delta * ease);
				if (p < 1) requestAnimationFrame(step); 
			};
			requestAnimationFrame(step);
		});
	}

	onButtonRipple(ev: MouseEvent) {
		const btn = ev.currentTarget as HTMLElement;
		btn.classList.remove('rippling');
		const rect = btn.getBoundingClientRect();
		const x = ev.clientX - rect.left; const y = ev.clientY - rect.top;
		btn.style.setProperty('--rx', `${x}px`);
		btn.style.setProperty('--ry', `${y}px`);
		void btn.offsetWidth; // reflow
		btn.classList.add('rippling');
	}

	// Split first word for accent style
	split(label: string): { first: string; rest: string } {
		const [first, ...rest] = label.split(' ');
		return { first: first ?? '', rest: rest.join(' ') };
	}

	// Build a bottom-anchored area path for tiny sparkline (no stroke)
	buildAreaPath(data: number[], width = 320, height = 120): string {
		if (!data || data.length < 2) return '';
		const pad = 6;
		const max = Math.max(...data);
		const min = Math.min(...data);
		const range = Math.max(1e-6, max - min);
		const stepX = width / (data.length - 1);

		const yFor = (v: number) => {
			const norm = (v - min) / range; // 0..1
			const y = height - pad - norm * (height - pad * 2);
			return Math.round(y * 100) / 100;
		};

		const points = data.map((v, i) => `${Math.round(i * stepX * 100) / 100},${yFor(v)}`);
		// Area polygon anchored to bottom
		return `M 0,${height} L ${points.join(' L ')} L ${width},${height} Z`;
	}

	// Build a line path matching the area for a crisp stroke overlay
	buildLinePath(data: number[], width = 320, height = 120): string {
		if (!data || data.length < 2) return '';
		const pad = 6;
		const max = Math.max(...data);
		const min = Math.min(...data);
		const range = Math.max(1e-6, max - min);
		const stepX = width / (data.length - 1);
		const yFor = (v: number) => {
			const norm = (v - min) / range;
			const y = height - pad - norm * (height - pad * 2);
			return Math.round(y * 100) / 100;
		};
		const points = data.map((v, i) => `${Math.round(i * stepX * 100) / 100},${yFor(v)}`);
		return `M ${points[0]} L ${points.slice(1).join(' L ')}`;
	}

	// Last point for the line, to render a focus dot
	lastPoint(data: number[], width = 320, height = 120): { x: number; y: number } | null {
		if (!data || data.length === 0) return null;
		const pad = 6;
		const max = Math.max(...data);
		const min = Math.min(...data);
		const range = Math.max(1e-6, max - min);
		const stepX = width / (Math.max(1, data.length - 1));
		const x = Math.round((data.length - 1) * stepX * 100) / 100;
		const norm = (data[data.length - 1] - min) / range;
		const y = Math.round((height - pad - norm * (height - pad * 2)) * 100) / 100;
		return { x, y };
	}

	initials(name: string): string {
		const parts = name.split(' ').filter(Boolean);
		return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '');
	}

	stars(rating: number): number[] { return Array.from({ length: 5 }, (_, i) => i < Math.round(rating) ? 1 : 0); }

	gradientId(v: Variant, idx: number) { return `sg-${v}-${idx}`; }
}

