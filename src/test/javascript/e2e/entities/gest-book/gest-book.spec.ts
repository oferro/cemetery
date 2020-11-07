import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GestBookComponentsPage, GestBookDeleteDialog, GestBookUpdatePage } from './gest-book.page-object';

const expect = chai.expect;

describe('GestBook e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let gestBookComponentsPage: GestBookComponentsPage;
  let gestBookUpdatePage: GestBookUpdatePage;
  let gestBookDeleteDialog: GestBookDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load GestBooks', async () => {
    await navBarPage.goToEntity('gest-book');
    gestBookComponentsPage = new GestBookComponentsPage();
    await browser.wait(ec.visibilityOf(gestBookComponentsPage.title), 5000);
    expect(await gestBookComponentsPage.getTitle()).to.eq('cemeteryApp.gestBook.home.title');
    await browser.wait(ec.or(ec.visibilityOf(gestBookComponentsPage.entities), ec.visibilityOf(gestBookComponentsPage.noResult)), 1000);
  });

  it('should load create GestBook page', async () => {
    await gestBookComponentsPage.clickOnCreateButton();
    gestBookUpdatePage = new GestBookUpdatePage();
    expect(await gestBookUpdatePage.getPageTitle()).to.eq('cemeteryApp.gestBook.home.createOrEditLabel');
    await gestBookUpdatePage.cancel();
  });

  it('should create and save GestBooks', async () => {
    const nbButtonsBeforeCreate = await gestBookComponentsPage.countDeleteButtons();

    await gestBookComponentsPage.clickOnCreateButton();

    await promise.all([
      gestBookUpdatePage.setBNameInput('bName'),
      gestBookUpdatePage.setBEmailInput('bEmail'),
      gestBookUpdatePage.setBPhoneInput('bPhone'),
      gestBookUpdatePage.setBContentInput('bContent'),
      gestBookUpdatePage.desistSelectLastOption(),
    ]);

    expect(await gestBookUpdatePage.getBNameInput()).to.eq('bName', 'Expected BName value to be equals to bName');
    expect(await gestBookUpdatePage.getBEmailInput()).to.eq('bEmail', 'Expected BEmail value to be equals to bEmail');
    expect(await gestBookUpdatePage.getBPhoneInput()).to.eq('bPhone', 'Expected BPhone value to be equals to bPhone');
    expect(await gestBookUpdatePage.getBContentInput()).to.eq('bContent', 'Expected BContent value to be equals to bContent');
    const selectedBNotActive = gestBookUpdatePage.getBNotActiveInput();
    if (await selectedBNotActive.isSelected()) {
      await gestBookUpdatePage.getBNotActiveInput().click();
      expect(await gestBookUpdatePage.getBNotActiveInput().isSelected(), 'Expected bNotActive not to be selected').to.be.false;
    } else {
      await gestBookUpdatePage.getBNotActiveInput().click();
      expect(await gestBookUpdatePage.getBNotActiveInput().isSelected(), 'Expected bNotActive to be selected').to.be.true;
    }

    await gestBookUpdatePage.save();
    expect(await gestBookUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await gestBookComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last GestBook', async () => {
    const nbButtonsBeforeDelete = await gestBookComponentsPage.countDeleteButtons();
    await gestBookComponentsPage.clickOnLastDeleteButton();

    gestBookDeleteDialog = new GestBookDeleteDialog();
    expect(await gestBookDeleteDialog.getDialogTitle()).to.eq('cemeteryApp.gestBook.delete.question');
    await gestBookDeleteDialog.clickOnConfirmButton();

    expect(await gestBookComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
