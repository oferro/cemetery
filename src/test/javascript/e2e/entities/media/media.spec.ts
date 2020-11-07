import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MediaComponentsPage, MediaDeleteDialog, MediaUpdatePage } from './media.page-object';

const expect = chai.expect;

describe('Media e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mediaComponentsPage: MediaComponentsPage;
  let mediaUpdatePage: MediaUpdatePage;
  let mediaDeleteDialog: MediaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Media', async () => {
    await navBarPage.goToEntity('media');
    mediaComponentsPage = new MediaComponentsPage();
    await browser.wait(ec.visibilityOf(mediaComponentsPage.title), 5000);
    expect(await mediaComponentsPage.getTitle()).to.eq('cemeteryApp.media.home.title');
    await browser.wait(ec.or(ec.visibilityOf(mediaComponentsPage.entities), ec.visibilityOf(mediaComponentsPage.noResult)), 1000);
  });

  it('should load create Media page', async () => {
    await mediaComponentsPage.clickOnCreateButton();
    mediaUpdatePage = new MediaUpdatePage();
    expect(await mediaUpdatePage.getPageTitle()).to.eq('cemeteryApp.media.home.createOrEditLabel');
    await mediaUpdatePage.cancel();
  });

  it('should create and save Media', async () => {
    const nbButtonsBeforeCreate = await mediaComponentsPage.countDeleteButtons();

    await mediaComponentsPage.clickOnCreateButton();

    await promise.all([
      mediaUpdatePage.mTypeSelectLastOption(),
      mediaUpdatePage.setMDescriptionInput('mDescription'),
      mediaUpdatePage.setMDateInput('2000-12-31'),
      mediaUpdatePage.setMLinkInput('mLink'),
      mediaUpdatePage.desistSelectLastOption(),
    ]);

    expect(await mediaUpdatePage.getMDescriptionInput()).to.eq('mDescription', 'Expected MDescription value to be equals to mDescription');
    expect(await mediaUpdatePage.getMDateInput()).to.eq('2000-12-31', 'Expected mDate value to be equals to 2000-12-31');
    expect(await mediaUpdatePage.getMLinkInput()).to.eq('mLink', 'Expected MLink value to be equals to mLink');
    const selectedMNotActive = mediaUpdatePage.getMNotActiveInput();
    if (await selectedMNotActive.isSelected()) {
      await mediaUpdatePage.getMNotActiveInput().click();
      expect(await mediaUpdatePage.getMNotActiveInput().isSelected(), 'Expected mNotActive not to be selected').to.be.false;
    } else {
      await mediaUpdatePage.getMNotActiveInput().click();
      expect(await mediaUpdatePage.getMNotActiveInput().isSelected(), 'Expected mNotActive to be selected').to.be.true;
    }

    await mediaUpdatePage.save();
    expect(await mediaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await mediaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Media', async () => {
    const nbButtonsBeforeDelete = await mediaComponentsPage.countDeleteButtons();
    await mediaComponentsPage.clickOnLastDeleteButton();

    mediaDeleteDialog = new MediaDeleteDialog();
    expect(await mediaDeleteDialog.getDialogTitle()).to.eq('cemeteryApp.media.delete.question');
    await mediaDeleteDialog.clickOnConfirmButton();

    expect(await mediaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
