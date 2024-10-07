import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FluigService } from './services/fluig.service';
import {
  PoComboOption,
  PoDialogService,
  PoNotificationService,
  PoTableColumn,
  PoTagType
} from '@po-ui/ng-components';
import { EstabCentroCusto } from './interfaces/estabCentroCusto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  {
  columns: Array<any> = new Array();
  public items: Array<any> = [];
  

  constructor(  ) {}



  
}
