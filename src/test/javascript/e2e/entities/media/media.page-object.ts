import { element, by, ElementFinder } from 'protractor';

export class MediaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-media div table .btn-danger'));
  title = element.all(by.css('jhi-media div h2#page-heading span')).first();
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

export class MediaUpdatePage {
  pageTitle = element(by.id('jhi-media-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  mTypeSelect = element(by.id('field_mType'));
  mDescriptionInput = element(by.id('field_mDescription'));
  mDateInput = element(by.id('field_mDate'));
  mLinkInput = element(by.id('field_mLink'));
  mNotActiveInput = element(by.id('field_mNotActive'));

  desistSelect = element(by.id('field_desist'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setMTypeSelect(mType: string): Promise<void> {
    await this.mTypeSelect.sendKeys(mType);
  }

  async getMTypeSelect(): Promise<string> {
    return await this.mTypeSelect.element(by.css('option:checked')).getText();
  }

  async mTypeSelectLastOption(): Promise<void> {
    await this.mTypeSelect.all(by.tagName('option')).last().click();
  }

  async setMDescriptionInput(mDescription: string): Promise<void> {
    await this.mDescriptionInput.sendKeys(mDescription);
  }

  async getMDescriptionInput(): Promise<string> {
    return await this.mDescriptionInput.getAttribute('value');
  }

  async setMDateInput(mDate: string): Promise<void> {
    await this.mDateInput.sendKeys(mDate);
  }

  async getMDateInput(): Promise<string> {
    return await this.mDateInput.getAttribute('value');
  }

  async setMLinkInput(mLink: string): Promise<void> {
    await this.mLinkInput.sendKeys(mLink);
  }

  async getMLinkInput(): Promise<string> {
    return await this.mLinkInput.getAttribute('value');
  }

  getMNotActiveInput(): ElementFinder {
    return this.mNotActiveInput;
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

export class MediaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-media-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-media'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
