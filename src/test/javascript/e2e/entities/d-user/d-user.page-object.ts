import { element, by, ElementFinder } from 'protractor';

export class DUserComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-d-user div table .btn-danger'));
  title = element.all(by.css('jhi-d-user div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class DUserUpdatePage {
  pageTitle = element(by.id('jhi-d-user-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  uForeNameInput = element(by.id('field_uForeName'));
  uSorNameInput = element(by.id('field_uSorName'));
  uPhoneInput = element(by.id('field_uPhone'));
  uEmailInput = element(by.id('field_uEmail'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setUForeNameInput(uForeName: string): Promise<void> {
    await this.uForeNameInput.sendKeys(uForeName);
  }

  async getUForeNameInput(): Promise<string> {
    return await this.uForeNameInput.getAttribute('value');
  }

  async setUSorNameInput(uSorName: string): Promise<void> {
    await this.uSorNameInput.sendKeys(uSorName);
  }

  async getUSorNameInput(): Promise<string> {
    return await this.uSorNameInput.getAttribute('value');
  }

  async setUPhoneInput(uPhone: string): Promise<void> {
    await this.uPhoneInput.sendKeys(uPhone);
  }

  async getUPhoneInput(): Promise<string> {
    return await this.uPhoneInput.getAttribute('value');
  }

  async setUEmailInput(uEmail: string): Promise<void> {
    await this.uEmailInput.sendKeys(uEmail);
  }

  async getUEmailInput(): Promise<string> {
    return await this.uEmailInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class DUserDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-dUser-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-dUser'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
