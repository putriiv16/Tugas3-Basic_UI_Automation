describe('Add Employee - OrangeHRM', function() {
    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
    });

    it('Add Employee and Create User for Employee - Positive Case', function() {
        cy.contains('PIM').click();
        cy.contains('Add Employee').should('be.visible').click();

        cy.url().should('include', '/pim/addEmployee');

        cy.get('[name="firstName"]').type('Putri');
        cy.get('[name="lastName"]').type('Anne');
        cy.contains('Save').click();
        cy.wait(2000);

        cy.contains('Admin').click();
        cy.contains('User Management').click();
        cy.contains('Add').click();

        cy.xpath('(//label[text()="User Role"]/following::div[contains(@class,"oxd-select-text-input")])[1]').click();
        cy.contains('div.oxd-select-option', 'ESS')
        .should('be.visible')
        .click({ force: true });

        cy.get('[placeholder="Type for hints..."]').type('Putri Anne');
        cy.get('div.oxd-autocomplete-option')
        .contains('Putri Anne')
        .should('be.visible')
        .click({ force: true });

        cy.xpath('(//label[text()="Status"]/following::div[contains(@class,"oxd-select-text-input")])').click();
        
        cy.contains('div.oxd-select-option', 'Enabled')
        .should('be.visible')
        .click({ force: true });

        cy.xpath('//label[text()="Username"]/ancestor::div[contains(@class, "oxd-input-group")]//input').type('putrianne09');
        cy.xpath('//label[text()="Password"]/ancestor::div[contains(@class, "oxd-input-group")]//input').type('Abcd1234!#');
        cy.xpath('//label[text()="Confirm Password"]/ancestor::div[contains(@class, "oxd-input-group")]//input').type('Abcd1234!#');

        cy.contains('Save').click();

        cy.get('.oxd-toast')
        .should('contain', 'Successfully Saved')
        .should('be.visible');

        cy.screenshot('addEmployee-positive');
    });

    it('Add Employee - Negative Case', function() {
        cy.contains('PIM').click();
        cy.contains('Add').click();

        cy.wait(2000);

        cy.get('[name="firstName"]').type('Putri');
        
        cy.contains('Save').click();

        cy.xpath('//span[contains(@class, "oxd-input-field-error-message") and text()="Required"]')
        .should('be.visible');

        cy.screenshot('addEmployee-negative');
    });
});