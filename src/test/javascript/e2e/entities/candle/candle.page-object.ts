import { element, by, ElementFinder } from 'protractor';

export class CandleComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-candle div table .btn-danger'));
  title = element.all(by.css('jhi-candle div h2#page-heading span')).first();
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

export class CandleUpdatePage {
  pageTitle = element(by.id('jhi-candle-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  cNameInput = element(by.id('field_cName'));
  cEmailInput = element(by.id('field_cEmail'));
  cPhoneInput = element(by.id('field_cPhone'));
  cContentInput = element(by.id('field_cContent'));
  cNotActiveInput = element(by.id('field_cNotActive'));

  desistSelect = element(by.id('field_desist'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCNameInput(cName: string): Promise<void> {
    await this.cNameInput.sendKeys(cName);
  }

  async getCNameInput(): Promise<string> {
    return await this.cNameInput.getAttribute('value');
  }

  async setCEmailInput(cEmail: string): Promise<void> {
    await this.cEmailInput.sendKeys(cEmail);
  }

  async getCEmailInput(): Promise<string> {
    return await this.cEmailInput.getAttribute('value');
  }

  async setCPhoneInput(cPhone: string): Promise<void> {
    await this.cPhoneInput.sendKeys(cPhone);
  }

  async getCPhoneInput(): Promise<string> {
    return await this.cPhoneInput.getAttribute('value');
  }

  async setCContentInput(cContent: string): Promise<void> {
    await this.cContentInput.sendKeys(cContent);
  }

  async getCContentInput(): Promise<string> {
    return await this.cContentInput.getAttribute('value');
  }

  getCNotActiveInput(): ElementFinder {
    return this.cNotActiveInput;
  }

  async desistSelectLastOption(): Promise<void> {
    await this.desistSelect.all(by.tagName('option')).last().click();
  }

  async desistSelectOption(option: string): Promise<void> {
    await this.desistSelect.sendKeys(option);
  }

  getDesistSelect(): ElementFinder {
    return this.desistSelect;
  }

  async getDesistSelectedOption(): Promise<string> {
    return await this.desistSelect.element(by.css('option:checked')).getText();
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

export class CandleDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-candle-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-candle'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
