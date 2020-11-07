import { element, by, ElementFinder } from 'protractor';

export class GestBookComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-gest-book div table .btn-danger'));
  title = element.all(by.css('jhi-gest-book div h2#page-heading span')).first();
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

export class GestBookUpdatePage {
  pageTitle = element(by.id('jhi-gest-book-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  bNameInput = element(by.id('field_bName'));
  bEmailInput = element(by.id('field_bEmail'));
  bPhoneInput = element(by.id('field_bPhone'));
  bContentInput = element(by.id('field_bContent'));
  bNotActiveInput = element(by.id('field_bNotActive'));

  desistSelect = element(by.id('field_desist'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setBNameInput(bName: string): Promise<void> {
    await this.bNameInput.sendKeys(bName);
  }

  async getBNameInput(): Promise<string> {
    return await this.bNameInput.getAttribute('value');
  }

  async setBEmailInput(bEmail: string): Promise<void> {
    await this.bEmailInput.sendKeys(bEmail);
  }

  async getBEmailInput(): Promise<string> {
    return await this.bEmailInput.getAttribute('value');
  }

  async setBPhoneInput(bPhone: string): Promise<void> {
    await this.bPhoneInput.sendKeys(bPhone);
  }

  async getBPhoneInput(): Promise<string> {
    return await this.bPhoneInput.getAttribute('value');
  }

  async setBContentInput(bContent: string): Promise<void> {
    await this.bContentInput.sendKeys(bContent);
  }

  async getBContentInput(): Promise<string> {
    return await this.bContentInput.getAttribute('value');
  }

  getBNotActiveInput(): ElementFinder {
    return this.bNotActiveInput;
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

export class GestBookDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-gestBook-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-gestBook'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
