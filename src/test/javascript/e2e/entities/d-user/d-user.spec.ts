import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DUserComponentsPage, DUserDeleteDialog, DUserUpdatePage } from './d-user.page-object';

const expect = chai.expect;

describe('DUser e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let dUserComponentsPage: DUserComponentsPage;
  let dUserUpdatePage: DUserUpdatePage;
  let dUserDeleteDialog: DUserDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load DUsers', async () => {
    await navBarPage.goToEntity('d-user');
    dUserComponentsPage = new DUserComponentsPage();
    await browser.wait(ec.visibilityOf(dUserComponentsPage.title), 5000);
    expect(await dUserComponentsPage.getTitle()).to.eq('cemeteryApp.dUser.home.title');
    await browser.wait(ec.or(ec.visibilityOf(dUserComponentsPage.entities), ec.visibilityOf(dUserComponentsPage.noResult)), 1000);
  });

  it('should load create DUser page', async () => {
    await dUserComponentsPage.clickOnCreateButton();
    dUserUpdatePage = new DUserUpdatePage();
    expect(await dUserUpdatePage.getPageTitle()).to.eq('cemeteryApp.dUser.home.createOrEditLabel');
    await dUserUpdatePage.cancel();
  });

  it('should create and save DUsers', async () => {
    const nbButtonsBeforeCreate = await dUserComponentsPage.countDeleteButtons();

    await dUserComponentsPage.clickOnCreateButton();

    await promise.all([
      dUserUpdatePage.setUForeNameInput('uForeName'),
      dUserUpdatePage.setUSorNameInput('uSorName'),
      dUserUpdatePage.setUPhoneInput('uPhone'),
      dUserUpdatePage.setUEmailInput('uEmail'),
    ]);

    expect(await dUserUpdatePage.getUForeNameInput()).to.eq('uForeName', 'Expected UForeName value to be equals to uForeName');
    expect(await dUserUpdatePage.getUSorNameInput()).to.eq('uSorName', 'Expected USorName value to be equals to uSorName');
    expect(await dUserUpdatePage.getUPhoneInput()).to.eq('uPhone', 'Expected UPhone value to be equals to uPhone');
    expect(await dUserUpdatePage.getUEmailInput()).to.eq('uEmail', 'Expected UEmail value to be equals to uEmail');

    await dUserUpdatePage.save();
    expect(await dUserUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await dUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last DUser', async () => {
    const nbButtonsBeforeDelete = await dUserComponentsPage.countDeleteButtons();
    await dUserComponentsPage.clickOnLastDeleteButton();

    dUserDeleteDialog = new DUserDeleteDialog();
    expect(await dUserDeleteDialog.getDialogTitle()).to.eq('cemeteryApp.dUser.delete.question');
    await dUserDeleteDialog.clickOnConfirmButton();

    expect(await dUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
