describe('Add Leave Entitlement - OrangeHRM', function() {
    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        cy.contains('Admin').should('be.visible');
    });

    it('Add Leave Entitlement for Employee - Positive Case', function() {

        cy.contains('Leave').click();
        cy.contains('Entitlements').click();
        cy.contains('Add Entitlements').click();

        cy.get('input[placeholder="Type for hints..."]').type('Putri Anne');

        cy.get('div.oxd-autocomplete-option')
        .contains('Putri Anne')
        .click({ force: true });

        cy.xpath('//label[text()="Leave Type"]/ancestor::div[contains(@class, "oxd-input-group")]//i[contains(@class, "oxd-select-text--arrow")]').click();
        cy.contains('CAN - Personal')
        .click({force: true});

        cy.xpath('//label[text()="Entitlement"]/following::input[1]').type('12');

        cy.contains('Save').click();
        cy.wait(2000);

        cy.xpath('//div[contains(@class,"oxd-dialog-container-default--inner")]//button[normalize-space()="Confirm"]')
        .click();
        
        cy.get('.oxd-toast')
        .should('contain', 'Successfully Saved')
        .should('be.visible');

        cy.screenshot('addLeave-positive');

    });

    it('Add Leave Entitlement for Employee - Negative Case', function() {
        cy.contains('Leave').click();
        cy.contains('Entitlements').click();
        cy.contains('Add Entitlements').click();

        cy.get('input[placeholder="Type for hints..."]').type('Putri Anne');

        cy.get('div.oxd-autocomplete-option')
        .contains('Putri Anne')
        .click({ force: true });

        cy.contains('Save').click();

        cy.xpath('//span[contains(@class, "oxd-input-field-error-message") and text()="Required"]')
        .should('be.visible');

        cy.screenshot('addLeave-negative');
    });
});