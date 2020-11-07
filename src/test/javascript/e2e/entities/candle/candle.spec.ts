import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CandleComponentsPage, CandleDeleteDialog, CandleUpdatePage } from './candle.page-object';

const expect = chai.expect;

describe('Candle e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let candleComponentsPage: CandleComponentsPage;
  let candleUpdatePage: CandleUpdatePage;
  let candleDeleteDialog: CandleDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Candles', async () => {
    await navBarPage.goToEntity('candle');
    candleComponentsPage = new CandleComponentsPage();
    await browser.wait(ec.visibilityOf(candleComponentsPage.title), 5000);
    expect(await candleComponentsPage.getTitle()).to.eq('cemeteryApp.candle.home.title');
    await browser.wait(ec.or(ec.visibilityOf(candleComponentsPage.entities), ec.visibilityOf(candleComponentsPage.noResult)), 1000);
  });

  it('should load create Candle page', async () => {
    await candleComponentsPage.clickOnCreateButton();
    candleUpdatePage = new CandleUpdatePage();
    expect(await candleUpdatePage.getPageTitle()).to.eq('cemeteryApp.candle.home.createOrEditLabel');
    await candleUpdatePage.cancel();
  });

  it('should create and save Candles', async () => {
    const nbButtonsBeforeCreate = await candleComponentsPage.countDeleteButtons();

    await candleComponentsPage.clickOnCreateButton();

    await promise.all([
      candleUpdatePage.setCNameInput('cName'),
      candleUpdatePage.setCEmailInput('cEmail'),
      candleUpdatePage.setCPhoneInput('cPhone'),
      candleUpdatePage.setCContentInput('cContent'),
      candleUpdatePage.desistSelectLastOption(),
    ]);

    expect(await candleUpdatePage.getCNameInput()).to.eq('cName', 'Expected CName value to be equals to cName');
    expect(await candleUpdatePage.getCEmailInput()).to.eq('cEmail', 'Expected CEmail value to be equals to cEmail');
    expect(await candleUpdatePage.getCPhoneInput()).to.eq('cPhone', 'Expected CPhone value to be equals to cPhone');
    expect(await candleUpdatePage.getCContentInput()).to.eq('cContent', 'Expected CContent value to be equals to cContent');
    const selectedCNotActive = candleUpdatePage.getCNotActiveInput();
    if (await selectedCNotActive.isSelected()) {
      await candleUpdatePage.getCNotActiveInput().click();
      expect(await candleUpdatePage.getCNotActiveInput().isSelected(), 'Expected cNotActive not to be selected').to.be.false;
    } else {
      await candleUpdatePage.getCNotActiveInput().click();
      expect(await candleUpdatePage.getCNotActiveInput().isSelected(), 'Expected cNotActive to be selected').to.be.true;
    }

    await candleUpdatePage.save();
    expect(await candleUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await candleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Candle', async () => {
    const nbButtonsBeforeDelete = await candleComponentsPage.countDeleteButtons();
    await candleComponentsPage.clickOnLastDeleteButton();

    candleDeleteDialog = new CandleDeleteDialog();
    expect(await candleDeleteDialog.getDialogTitle()).to.eq('cemeteryApp.candle.delete.question');
    await candleDeleteDialog.clickOnConfirmButton();

    expect(await candleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
