import {Component, OnDestroy, OnInit} from '@angular/core';
import {IEntrepot} from '../../model/entrepot.model';
import {Subscription} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {EntrepotService} from './entrepot.service';
import {EntrepotDeleteComponent} from './entrepot-delete/entrepot-delete.component';


@Component({
  selector: 'app-entrepot',
  templateUrl: './entrepot.component.html',
  styleUrls: ['./entrepot.component.scss']
})
export class EntrepotComponent implements OnInit, OnDestroy {
  entrepots?: IEntrepot[];
   user: any;

  constructor(protected entrepotService: EntrepotService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.entrepotService.query()
      .subscribe((res: HttpResponse<IEntrepot[]>) => (this.entrepots = res.body.filter((entrepot) => entrepot.deleted === false) || []));
    this.entrepotService.entrepotSubject.subscribe(() => {
      this.entrepotService.query()
        .subscribe((res: HttpResponse<IEntrepot[]>) => (this.entrepots = res.body.filter((entrepot) => entrepot.deleted === false) || []));
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
  }

  ngOnDestroy(): void {
  }

  trackId(index: number, item: IEntrepot): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  delete(entropot: IEntrepot): void {
    const modalRef = this.modalService.open(EntrepotDeleteComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.entropot = entropot;
  }
}
