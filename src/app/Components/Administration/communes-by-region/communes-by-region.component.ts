import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunesService } from '../../../Services/communes.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-communes-by-region',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './communes-by-region.component.html',
  styleUrl: './communes-by-region.component.css'
})
export class CommunesByRegionComponent implements OnInit {
  communes: any[] = [];
  region: string = '';

  constructor(
    private route: ActivatedRoute,
    private communesService: CommunesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.region = params.get('region') || '';
      this.loadCommunesByRegion(this.region);
    });
  }

  loadCommunesByRegion(region: string): void {
    this.communesService.getCommunesByRegion(region).subscribe(
      (data) => {
        this.communes = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des communes par région:', error);
      }
    );
  }
  goBack(): void {
    this.router.navigate(['/sidebar/dashboard']);
  }
}