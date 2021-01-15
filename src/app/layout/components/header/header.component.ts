import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
// import { BnNgIdleService } from 'bn-ng-idle';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EntrepotService} from '../../entrepot/entrepot.service';
import {Entrepot, IEntrepot} from '../../../model/entrepot.model';
import {UserService} from '../../users/users.service';
import {MatSnackBar} from '@angular/material';
import {Admin} from '../../../model/admin.model';
import {LoginService} from '../../../login/login.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    currentUser: any;
    dataUser: any;
    userName: any;
    auth: string;
    idleTimer: any ;


  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  title = 'angular-idle-timeout';
  private objUser: Admin = JSON.parse(localStorage.getItem('currentUser')).data[0];
  private closeResult: string;
  private entrepots: IEntrepot[] = [];
    constructor(private translate: TranslateService, public router: Router, private idle: Idle, private keepalive: Keepalive,
                private modalService: NgbModal, private entrepotService: EntrepotService, private userService: UserService,
                private snackBar: MatSnackBar, private loginservice: LoginService) {

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.dataUser = this.currentUser.data[0];

        if (localStorage.getItem('auth') === 'admin') {
            this.userName = this.dataUser.name;
            this.idleTimer = 300; // 5min
        } else {
            this.userName = this.dataUser.nameUser;
            this.idleTimer = 10800 ; // 3 heures
        }

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });

             // Timert session

              // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(this.idleTimer);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(10);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
      console.log(this.idleState);
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState);
      this.router.navigate(['/login']);
      this.onLoggedout();
    });

    idle.onIdleStart.subscribe(() => {
        this.idleState = 'You\'ve gone idle!';
        console.log(this.idleState);
       // this.childModal.show();
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
      console.log(this.idleState);
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();


        // fin timer session


    }

    ngOnInit(): void {
        this.pushRightClass = 'push-right';
      this.objUser = JSON.parse(localStorage.getItem('currentUser')).data[0];

      /*
      this.bnIdle.startWatching(10).subscribe((isTimedOut: boolean) => {
        if (isTimedOut) {
          console.log('session expired');
          this.router.navigate(['/login']);
          this.onLoggedout();
        }
      }); */

    }
    getEntrepots(){
      this.entrepotService.query().subscribe((res) =>{
        if (!!this.objUser.entrepot){
          console.log('entrepot existe in user')
          this.entrepots = res.body.filter((entrepot) => (entrepot.deleted === false && entrepot !== this.objUser.entrepot));
        } else {
          this.entrepots = res.body.filter((entrepot) => (entrepot.deleted === false));
        }
      })
    }
  open(content) {
    this.getEntrepots();
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('auth');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    reset() {
      this.idle.watch();
      this.idleState = 'Started.';
      this.timedOut = false;
    }

  Update() {
      const dataAdmin = new Admin(this.objUser.idAdmin,this.objUser.name,this.objUser.email,this.objUser.password,this.objUser.image,
        this.objUser.entrepot, this.objUser.financier)
    this.userService.updateAdmin(dataAdmin, this.objUser.idAdmin).subscribe(() => {

      this.snackBar.open('Modifications faites avec succès', 'Fermer', {
        duration: 5000,
      });
    },() => {
      this.snackBar.open('Echec de modification!', 'Fermer', {
        duration: 5000,
      });
    });
  }
}
