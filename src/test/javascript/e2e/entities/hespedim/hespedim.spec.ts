import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { HespedimComponentsPage, HespedimDeleteDialog, HespedimUpdatePage } from './hespedim.page-object';

const expect = chai.expect;

describe('Hespedim e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let hespedimComponentsPage: HespedimComponentsPage;
  let hespedimUpdatePage: HespedimUpdatePage;
  let hespedimDeleteDialog: HespedimDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Hespedims', async () => {
    await navBarPage.goToEntity('hespedim');
    hespedimComponentsPage = new HespedimComponentsPage();
    await browser.wait(ec.visibilityOf(hespedimComponentsPage.title), 5000);
    expect(await hespedimComponentsPage.getTitle()).to.eq('cemeteryApp.hespedim.home.title');
    await browser.wait(ec.or(ec.visibilityOf(hespedimComponentsPage.entities), ec.visibilityOf(hespedimComponentsPage.noResult)), 1000);
  });

  it('should load create Hespedim page', async () => {
    await hespedimComponentsPage.clickOnCreateButton();
    hespedimUpdatePage = new HespedimUpdatePage();
    expect(await hespedimUpdatePage.getPageTitle()).to.eq('cemeteryApp.hespedim.home.createOrEditLabel');
    await hespedimUpdatePage.cancel();
  });

  it('should create and save Hespedims', async () => {
    const nbButtonsBeforeCreate = await hespedimComponentsPage.countDeleteButtons();

    await hespedimComponentsPage.clickOnCreateButton();

    await promise.all([
      hespedimUpdatePage.setHNameInput('hName'),
      hespedimUpdatePage.setHEmailInput('hEmail'),
      hespedimUpdatePage.setHContentInput('hContent'),
      hespedimUpdatePage.desistSelectLastOption(),
    ]);

    expect(await hespedimUpdatePage.getHNameInput()).to.eq('hName', 'Expected HName value to be equals to hName');
    expect(await hespedimUpdatePage.getHEmailInput()).to.eq('hEmail', 'Expected HEmail value to be equals to hEmail');
    expect(await hespedimUpdatePage.getHContentInput()).to.eq('hContent', 'Expected HContent value to be equals to hContent');
    const selectedHNotActive = hespedimUpdatePage.getHNotActiveInput();
    if (await selectedHNotActive.isSelected()) {
      await hespedimUpdatePage.getHNotActiveInput().click();
      expect(await hespedimUpdatePage.getHNotActiveInput().isSelected(), 'Expected hNotActive not to be selected').to.be.false;
    } else {
      await hespedimUpdatePage.getHNotActiveInput().click();
      expect(await hespedimUpdatePage.getHNotActiveInput().isSelected(), 'Expected hNotActive to be selected').to.be.true;
    }

    await hespedimUpdatePage.save();
    expect(await hespedimUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await hespedimComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Hespedim', async () => {
    const nbButtonsBeforeDelete = await hespedimComponentsPage.countDeleteButtons();
    await hespedimComponentsPage.clickOnLastDeleteButton();

    hespedimDeleteDialog = new HespedimDeleteDialog();
    expect(await hespedimDeleteDialog.getDialogTitle()).to.eq('cemeteryApp.hespedim.delete.question');
    await hespedimDeleteDialog.clickOnConfirmButton();

    expect(await hespedimComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
