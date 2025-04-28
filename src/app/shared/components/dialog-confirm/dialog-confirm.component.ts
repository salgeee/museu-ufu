import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ButtonDirective } from '@shared/directives/button';

export interface DialogConfirmInputs {
	/** Mensagem a ser exibida no diálogo */
	message?: string;
	/** Ícone a ser exibido no diálogo */
	icon?: string;
	/** Rótulo do botão de confirmação */
	buttonConfirmLabel?: string;
	/** Indica se o botão de confirmação deve ser exibido */
	buttonConfirmShow?: boolean;
	/** Rótulo do botão de cancelamento */
	buttonCancelLabel?: string;
	/** Indica se o botão de cancelamento deve ser exibido */
	buttonCancelShow?: boolean;
}

/**
 * Componente DialogConfirmComponent é responsável por exibir um diálogo de confirmação.
 * @example
 * private dialog = inject(Dialog);
 * const dialogRef = this.dialog.open(DialogConfirmComponent, { data: { message: 'Tem certeza que deseja continuar?' } });
 * dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(isConfirmed => {})
 */
@Component({
	selector: 'app-dialog-confirm',
	standalone: true,
	imports: [ButtonDirective],
	templateUrl: './dialog-confirm.component.html',
	styleUrl: './dialog-confirm.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogConfirmComponent {
	/** Referência ao diálogo para controle de fechamento */
	dialogRef = inject<DialogRef<boolean>>(DialogRef<boolean>);
	/** Dados de entrada do diálogo */
	data: DialogConfirmInputs = inject(DIALOG_DATA);

	constructor() {
		this.data = {
			message: this.data.message || 'Tem certeza que deseja continuar?',
			icon: this.data.icon || 'fa-exclamation-triangle',
			buttonConfirmLabel: this.data.buttonConfirmLabel || 'Confirmar',
			buttonConfirmShow: this.data.buttonConfirmShow || true,
			buttonCancelLabel: this.data.buttonCancelLabel || 'Cancelar',
			buttonCancelShow: this.data.buttonCancelShow || true,
		};
	}

	/**
	 * Manipulador de evento para o botão de cancelamento.
	 * Fecha o diálogo retornando `false`.
	 * @example
	 * this.onCancel();
	 */
	onCancel() {
		this.dialogRef.close(false);
	}

	/**
	 * Manipulador de evento para o botão de confirmação.
	 * Fecha o diálogo retornando `true`.
	 * @example
	 * this.onConfirm();
	 */
	onConfirm() {
		this.dialogRef.close(true);
	}
}
