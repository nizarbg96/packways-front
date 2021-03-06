import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-statdriver',
    templateUrl: './statdriver.component.html',
    styleUrls: ['./statdriver.component.scss']
})
export class StatDriverComponent implements OnInit {
    @Input() bgClass: string;
    @Input() icon: string;
    //@Input() count2: number;
    @Input() count: number[];
    @Input() label: string;
    @Input() data: number;
    @Output() event: EventEmitter<any> = new EventEmitter();

    constructor() {}

    ngOnInit() {}
}
