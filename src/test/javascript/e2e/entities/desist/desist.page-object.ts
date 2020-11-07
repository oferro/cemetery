import { element, by, ElementFinder } from 'protractor';

export class DesistComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-desist div table .btn-danger'));
  title = element.all(by.css('jhi-desist div h2#page-heading span')).first();
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

export class DesistUpdatePage {
  pageTitle = element(by.id('jhi-desist-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  dSorNameInput = element(by.id('field_dSorName'));
  dForeNameInput = element(by.id('field_dForeName'));
  dPicInput = element(by.id('file_dPic'));
  dBerthPlaceInput = element(by.id('field_dBerthPlace'));
  dCareerInput = element(by.id('field_dCareer'));
  dEducationInput = element(by.id('field_dEducation'));
  dDateBornInput = element(by.id('field_dDateBorn'));
  dDateDeadInput = element(by.id('field_dDateDead'));
  dNotActiveInput = element(by.id('field_dNotActive'));

  dUserSelect = element(by.id('field_dUser'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDSorNameInput(dSorName: string): Promise<void> {
    await this.dSorNameInput.sendKeys(dSorName);
  }

  async getDSorNameInput(): Promise<string> {
    return await this.dSorNameInput.getAttribute('value');
  }

  async setDForeNameInput(dForeName: string): Promise<void> {
    await this.dForeNameInput.sendKeys(dForeName);
  }

  async getDForeNameInput(): Promise<string> {
    return await this.dForeNameInput.getAttribute('value');
  }

  async setDPicInput(dPic: string): Promise<void> {
    await this.dPicInput.sendKeys(dPic);
  }

  async getDPicInput(): Promise<string> {
    return await this.dPicInput.getAttribute('value');
  }

  async setDBerthPlaceInput(dBerthPlace: string): Promise<void> {
    await this.dBerthPlaceInput.sendKeys(dBerthPlace);
  }

  async getDBerthPlaceInput(): Promise<string> {
    return await this.dBerthPlaceInput.getAttribute('value');
  }

  async setDCareerInput(dCareer: string): Promise<void> {
    await this.dCareerInput.sendKeys(dCareer);
  }

  async getDCareerInput(): Promise<string> {
    return await this.dCareerInput.getAttribute('value');
  }

  async setDEducationInput(dEducation: string): Promise<void> {
    await this.dEducationInput.sendKeys(dEducation);
  }

  async getDEducationInput(): Promise<string> {
    return await this.dEducationInput.getAttribute('value');
  }

  async setDDateBornInput(dDateBorn: string): Promise<void> {
    await this.dDateBornInput.sendKeys(dDateBorn);
  }

  async getDDateBornInput(): Promise<string> {
    return await this.dDateBornInput.getAttribute('value');
  }

  async setDDateDeadInput(dDateDead: string): Promise<void> {
    await this.dDateDeadInput.sendKeys(dDateDead);
  }

  async getDDateDeadInput(): Promise<string> {
    return await this.dDateDeadInput.getAttribute('value');
  }

  getDNotActiveInput(): ElementFinder {
    return this.dNotActiveInput;
  }

  async dUserSelectLastOption(): Promise<void> {
    await this.dUserSelect.all(by.tagName('option')).last().click();
  }

  async dUserSelectOption(option: string): Promise<void> {
    await this.dUserSelect.sendKeys(option);
  }

  getDUserSelect(): ElementFinder {
    return this.dUserSelect;
  }

  async getDUserSelectedOption(): Promise<string> {
    return await this.dUserSelect.element(by.css('option:checked')).getText();
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

export class DesistDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-desist-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-desist'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
