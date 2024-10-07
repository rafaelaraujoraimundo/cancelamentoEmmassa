import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FluigService } from '../../services/fluig.service';
import {
  PoComboOption,
  PoDialogService,
  PoModalComponent,
  PoNotificationService,
  PoTagType,
} from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.css'],
})
export class ListCardsComponent implements OnInit {
  @ViewChild(PoModalComponent, { static: true }) poModal?: PoModalComponent;
  public items: Array<PoComboOption> = [];
  userLogin!: string;
  user!: User;
  userDestino!: any;
  userBase!: any;
  user$!: Observable<User>;
  public bButtonCancel: boolean = true
  danger: any = PoTagType.Danger
  sucess: any = PoTagType.Success

  nCountSucess: number = 0
  nCountError: number = 0
  cancelInstanceList!: any;
  cancelResults: any[] = [];
  cancelResultsSummary: any[] = [];
  
  message: string = 'Deseja cancelar os processos selecionados?';
  title: string = 'Cancelamento de Processos em Massa';

  tasks: any[] = [];
  selectedTasks: number[] = [];

  columns: Array<any> = [
    { property: 'processInstanceId', label: 'Processo' },
    { property: 'processDescription', label: 'Descrição' },
    { property: 'requesterName', label: 'Solicitante' },
    { property: 'stateDescription', label: 'Status' },
    { property: 'colleagueName', label: 'Nome do Colaborador' },
    { property: 'startDateProcess', label: 'Data de Início do Processo' },
    { property: 'attachDescription', label: 'Descrição do Anexo' }
  ];

  form?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fluigService: FluigService,
    private poNotification: PoNotificationService,
    private poDialog: PoDialogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userLogin = this.fluigService.getUserLogin();
    this.getUser();
    this.getUserList();
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      usuarioBase: [null, Validators.required], // Campo obrigatório  // Checkbox novo
    });
  }

  onSubmit() {
    if (this.form!.valid) {
      this.obterUserBase(this.form!.value.usuarioBase).subscribe({
        next: (response) => {
          this.userBase = this.criarUser(response);
          this.getTasks(this.userBase.userCode);
        },
        error: (err) => this.tratarErro('Erro ao atualizar o usuário', err),
      });
      console.log(this.form);
    }
  }

  getTasks(userCode: string) {
    this.fluigService.getTasks(userCode).subscribe({
      next: (response) => {
        // Converte o campo startDateProcess de timestamp para data legível
        this.tasks = response.invdata.map((task: any) => {
          this.bButtonCancel = false;
          return {
            ...task,
            startDateProcess: new Date(task.startDateProcess).toLocaleString() // Converte para Data e Hora legíveis
          };
          
        });
      },
      error: (err) => this.tratarErro('Erro ao obter as tarefas', err),
    });
  }

  onSelectionChange(selectedItem: any) {
    // Inicializa o cancelInstanceList no formato correto, caso não exista
    if (!this.cancelInstanceList) {
        this.cancelInstanceList = {
            cancelInstanceList: [],
            cancelText: "Colaborador Desligado"
        };
    }

    // Verifica se o `processInstanceId` do item selecionado já está no cancelInstanceList
    const existingItem = this.cancelInstanceList.cancelInstanceList.find(
        (item: any) => item.processInstanceId === selectedItem.processInstanceId
    );

    // Se não estiver, adiciona o novo item ao array
    if (!existingItem) {
        this.cancelInstanceList.cancelInstanceList.push({
            replacedId: "admin",
            processInstanceId: selectedItem.processInstanceId
        });
    }

    console.log(this.cancelInstanceList); // Apenas para verificar no console
}

  onSelectionAll(selectedItems: any) {
    const cancelInstance = selectedItems.map((item: any) => {
      return {
          replacedId: 'admin',
          processInstanceId: item.processInstanceId
      };
  });

  this.cancelInstanceList = {
      cancelInstanceList: cancelInstance,
      cancelText: 'Colaborador Desligado'
  };

  console.log(this.cancelInstanceList);
  }
  onUnSelectionAll() {
    // Verifica se o cancelInstanceList já existe no formato correto
    if (this.cancelInstanceList && this.cancelInstanceList.cancelInstanceList) {
        // Redefine o array para um array vazio, removendo todos os itens
        this.cancelInstanceList.cancelInstanceList = [];
    }

    console.log(this.cancelInstanceList); // Apenas para verificar no console
}

  onUnSelectionChange(unselectedItem: any) {
    // Verifica se o cancelInstanceList já existe no formato correto
    if (this.cancelInstanceList && this.cancelInstanceList.cancelInstanceList) {
        // Filtra a lista removendo o item com o processInstanceId correspondente
        this.cancelInstanceList.cancelInstanceList = this.cancelInstanceList.cancelInstanceList.filter(
            (item: any) => item.processInstanceId !== unselectedItem.processInstanceId
        );
    }

    console.log(this.cancelInstanceList); // Apenas para verificar no console
}

onCancelInstances(payload: any) {
  this.fluigService.cancelInstances(payload).subscribe({
    next: (response) => {
      this.cancelResults = response.content.cancelInstanceResults;
      this.nCountSucess = response.content.successCount
      this.nCountError =  response.content.failCount
      
      console.log('Cancelamento bem-sucedido:', response);
      this.poModal?.open()
      this.onSubmit()
      this.onUnSelectionAll()
    },
    error: (error) => {
      console.error('Erro ao cancelar instâncias:', error);
    }
  });
}

  obterUserBase(usuarioBase: string) {
    return this.fluigService.getUserBase(usuarioBase);
  }

  criarUser(res: any) {
    return {
      email: res.email,
      name: res.description,
      alias: res.login,
      userCode: res.userCode,
      lastName: res.lastName,
      firstName: res.firstName,
    };
  }


  confirmCancel() {

    this.poDialog.confirm({
      title: this.title,
      message: this.message,
      confirm: () => this.onCancelInstances(this.cancelInstanceList),
    });
    
  }
  






  tratarErro(mensagem: string, err: any) {
    this.poNotification.error(`${mensagem}: ${err.message}`);
    console.error('Erro:', err);
  }




  getUserList() {
    this.fluigService.getListUser().subscribe(
      (response: any) => {
        this.items = response.items.map((val: any) => ({
          label: val.name, // O campo 'name' será o label
          value: val.alias, // O campo 'alias' será o value
        }));

        //console.log(this.items);
      },
      (error) => {
        console.error('Erro ao consumir a API', error);
      }
    );
  }

  getUser() {
    // Usamos o FluigService para buscar o usuário com base no userLogin
    this.fluigService.getCurrent(this.userLogin).subscribe({
      next: (res: any) => {
        // Criamos um objeto do tipo User com base na resposta da API
        this.user = {
          email: res.email,
          name: res.name,
          alias: res.alias,
        };
        //console.log('Usuário carregado:', this.user);
      },
      error: (err: any) => {
        // Tratamento de erro
        this.poNotification.error(
          'Erro ao carregar o usuário: ' + err.error.message
        );
        console.log(err);
      },
    });
  }
}
