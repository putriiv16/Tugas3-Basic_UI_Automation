describe('Employee Leave Approval Flow - OrangeHRM', function() {
    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    it('Leave Request from Employee - Positive Case', function() {
        cy.get('[name="username"]').type('putrianne09');
        cy.get('[name="password"]').type('Abcd1234!#');
        cy.get('button[type="submit"]').click();

        cy.contains('Leave').click();

        cy.xpath("//a[text()='Apply' and contains(@class, 'oxd-topbar-body-nav-tab-item')]").click();

        cy.xpath('//label[text()="Leave Type"]/ancestor::div[contains(@class, "oxd-input-group")]//i[contains(@class, "oxd-select-text--arrow")]').click();
        cy.contains('CAN - Personal')
        .click({force: true});

        cy.xpath('//label[text()="From Date"]/ancestor::div[contains(@class, "oxd-input-group")]//input')
        .should('be.visible')
        .type('2025-20-05')
        .click();

        cy.xpath('//label[text()="Comments"]/ancestor::div[contains(@class, "oxd-input-group")]//textarea')
        .should('be.visible')
        .type('Family matters');

        cy.get('button').contains('Apply').click();
        cy.wait(1000);

        cy.xpath('//a[contains(@class, "oxd-topbar-body-nav-tab-item") and text()="My Leave"]').click();

        cy.wait(2000);
        cy.scrollTo('bottom');
        cy.contains('Pending Approval');

        cy.screenshot('leaveApprove_Request-positive');
    });

    it.only('Leave Approval from Admin', function() {
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        cy.contains('Leave').click();
        
        cy.xpath('//li[contains(., "More") and .//i[contains(@class, "bi-three-dots-vertical")]]').click();
        cy.get(':nth-child(1) > li > .oxd-topbar-body-nav-tab-link').click();

        cy.wait(2000);
        cy.scrollTo('bottom');

        cy.xpath('//button[contains(@class, "oxd-button--label-success") and normalize-space(.)="Approve"]')
        .click({ force: true });

        cy.screenshot('leaveApprove_Approval-positive');
    });

    it('Leave Approve Data Checking', function() {
        cy.get('[name="username"]').type('putrianne09');
        cy.get('[name="password"]').type('Abcd1234!#');
        cy.get('button[type="submit"]').click();

        cy.contains('Leave').click();

        cy.xpath("//li[contains(@class, 'oxd-topbar-body-nav-tab')]//a[text()='My Leave']").click()

        cy.wait(2000);
        cy.scrollTo('bottom');

        cy.contains('Pending Approval')
        .should('be.visible');
        
        cy.wait(2000);
        cy.screenshot('leaveApprove_Check-positive');
    });

    it('Leave Request from Employee - Negative Case', () => {
        cy.get('[name="username"]').type('putrianne09');
        cy.get('[name="password"]').type('Abcd1234!#');
        cy.get('button[type="submit"]').click();

        cy.contains('Leave').click();

        cy.get('a.oxd-topbar-body-nav-tab-item').contains('Apply').click();

        cy.xpath('//label[text()="Leave Type"]/ancestor::div[contains(@class, "oxd-input-group")]//i[contains(@class, "oxd-select-text--arrow")]').click();
        cy.contains('CAN - Personal')
        .click({force: true});

        cy.get('button').contains('Apply').click();

        cy.xpath('//span[contains(@class, "oxd-input-field-error-message") and text()="Required"]')
        .should('be.visible');

        cy.screenshot('leaveApprove_Request-negative');
    });
});