import { element, by, ElementFinder } from 'protractor';

export class HespedimComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-hespedim div table .btn-danger'));
  title = element.all(by.css('jhi-hespedim div h2#page-heading span')).first();
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

export class HespedimUpdatePage {
  pageTitle = element(by.id('jhi-hespedim-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  hNameInput = element(by.id('field_hName'));
  hEmailInput = element(by.id('field_hEmail'));
  hContentInput = element(by.id('field_hContent'));
  hNotActiveInput = element(by.id('field_hNotActive'));

  desistSelect = element(by.id('field_desist'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setHNameInput(hName: string): Promise<void> {
    await this.hNameInput.sendKeys(hName);
  }

  async getHNameInput(): Promise<string> {
    return await this.hNameInput.getAttribute('value');
  }

  async setHEmailInput(hEmail: string): Promise<void> {
    await this.hEmailInput.sendKeys(hEmail);
  }

  async getHEmailInput(): Promise<string> {
    return await this.hEmailInput.getAttribute('value');
  }

  async setHContentInput(hContent: string): Promise<void> {
    await this.hContentInput.sendKeys(hContent);
  }

  async getHContentInput(): Promise<string> {
    return await this.hContentInput.getAttribute('value');
  }

  getHNotActiveInput(): ElementFinder {
    return this.hNotActiveInput;
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

export class HespedimDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-hespedim-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-hespedim'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
