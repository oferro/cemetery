import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DesistComponentsPage, DesistDeleteDialog, DesistUpdatePage } from './desist.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Desist e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let desistComponentsPage: DesistComponentsPage;
  let desistUpdatePage: DesistUpdatePage;
  let desistDeleteDialog: DesistDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Desists', async () => {
    await navBarPage.goToEntity('desist');
    desistComponentsPage = new DesistComponentsPage();
    await browser.wait(ec.visibilityOf(desistComponentsPage.title), 5000);
    expect(await desistComponentsPage.getTitle()).to.eq('cemeteryApp.desist.home.title');
    await browser.wait(ec.or(ec.visibilityOf(desistComponentsPage.entities), ec.visibilityOf(desistComponentsPage.noResult)), 1000);
  });

  it('should load create Desist page', async () => {
    await desistComponentsPage.clickOnCreateButton();
    desistUpdatePage = new DesistUpdatePage();
    expect(await desistUpdatePage.getPageTitle()).to.eq('cemeteryApp.desist.home.createOrEditLabel');
    await desistUpdatePage.cancel();
  });

  it('should create and save Desists', async () => {
    const nbButtonsBeforeCreate = await desistComponentsPage.countDeleteButtons();

    await desistComponentsPage.clickOnCreateButton();

    await promise.all([
      desistUpdatePage.setDSorNameInput('dSorName'),
      desistUpdatePage.setDForeNameInput('dForeName'),
      desistUpdatePage.setDPicInput(absolutePath),
      desistUpdatePage.setDBerthPlaceInput('dBerthPlace'),
      desistUpdatePage.setDCareerInput('dCareer'),
      desistUpdatePage.setDEducationInput('dEducation'),
      desistUpdatePage.setDDateBornInput('2000-12-31'),
      desistUpdatePage.setDDateDeadInput('2000-12-31'),
      // desistUpdatePage.dUserSelectLastOption(),
    ]);

    expect(await desistUpdatePage.getDSorNameInput()).to.eq('dSorName', 'Expected DSorName value to be equals to dSorName');
    expect(await desistUpdatePage.getDForeNameInput()).to.eq('dForeName', 'Expected DForeName value to be equals to dForeName');
    expect(await desistUpdatePage.getDPicInput()).to.endsWith(fileNameToUpload, 'Expected DPic value to be end with ' + fileNameToUpload);
    expect(await desistUpdatePage.getDBerthPlaceInput()).to.eq('dBerthPlace', 'Expected DBerthPlace value to be equals to dBerthPlace');
    expect(await desistUpdatePage.getDCareerInput()).to.eq('dCareer', 'Expected DCareer value to be equals to dCareer');
    expect(await desistUpdatePage.getDEducationInput()).to.eq('dEducation', 'Expected DEducation value to be equals to dEducation');
    expect(await desistUpdatePage.getDDateBornInput()).to.eq('2000-12-31', 'Expected dDateBorn value to be equals to 2000-12-31');
    expect(await desistUpdatePage.getDDateDeadInput()).to.eq('2000-12-31', 'Expected dDateDead value to be equals to 2000-12-31');
    const selectedDNotActive = desistUpdatePage.getDNotActiveInput();
    if (await selectedDNotActive.isSelected()) {
      await desistUpdatePage.getDNotActiveInput().click();
      expect(await desistUpdatePage.getDNotActiveInput().isSelected(), 'Expected dNotActive not to be selected').to.be.false;
    } else {
      await desistUpdatePage.getDNotActiveInput().click();
      expect(await desistUpdatePage.getDNotActiveInput().isSelected(), 'Expected dNotActive to be selected').to.be.true;
    }

    await desistUpdatePage.save();
    expect(await desistUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await desistComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Desist', async () => {
    const nbButtonsBeforeDelete = await desistComponentsPage.countDeleteButtons();
    await desistComponentsPage.clickOnLastDeleteButton();

    desistDeleteDialog = new DesistDeleteDialog();
    expect(await desistDeleteDialog.getDialogTitle()).to.eq('cemeteryApp.desist.delete.question');
    await desistDeleteDialog.clickOnConfirmButton();

    expect(await desistComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
