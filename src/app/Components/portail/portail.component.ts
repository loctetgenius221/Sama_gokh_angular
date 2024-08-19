import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-portail',
  standalone: true,
  imports: [],
  templateUrl: './portail.component.html',
  styleUrl: './portail.component.css'
})
export class PortailComponent implements AfterViewInit {
  private currentIndex: number = 0;
  private items!: NodeListOf<HTMLElement>;
  private totalItems!: number;

  ngAfterViewInit() {
    this.items = document.querySelectorAll('.carousel-item');
    this.totalItems = this.items.length;
    this.showItem(this.currentIndex);
  }

  showItem(index: number) {
    const offset = -index * 100;
    const carousel = document.querySelector('.carousel') as HTMLElement;
    carousel.style.transform = `translateX(${offset}%)`;
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.totalItems - 1;
    }
    this.showItem(this.currentIndex);
  }

  next() {
    if (this.currentIndex < this.totalItems - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.showItem(this.currentIndex);
  }
}
