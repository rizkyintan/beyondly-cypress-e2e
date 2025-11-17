
const login = () => {
    cy.get('#page-login__tabs-number__input-number').type('811234343531');
    cy.get('#page-login__tabs-email__input-password').type('Intantester123_');
    cy.get('#page-login__button-login').click();

    cy.url().should('include', '/home');
    cy.get('#search-all-product').should('exist');

};

describe('Login Functionality', () => {
  const baseUrl = 'https://recruitment-staging-queenbee.paradev.io';
  const loginUrl = `${baseUrl}/login`;

  beforeEach(() => {
    cy.visit(loginUrl);
    cy.viewport(1280, 720);
    cy.get('body').click(100,100)
    cy.get('#page-login__tabs-email', { timeout: 10000 }).should('be.visible');
  });

  // TC_LOGIN_001
  it.skip('TC_LOGIN_001 - Verify login with valid phone number and password', () => {
    cy.get('#page-login__tabs-number__input-number').type('811234343531');
    cy.get('#page-login__tabs-email__input-password').type('Intantester123_');
    cy.get('#page-login__button-login').click();

    // Expect user redirected to homepage and logged in
    cy.url().should('eq', `${baseUrl}/home`);
    cy.get('#search-all-product').should('exist');
  });

  // TC_LOGIN_002 
  it.skip('TC_LOGIN_002 - Verify login with valid email and password', () => {
    cy.get('#page-login__tabs-email').click();
    cy.get('#page-login__tabs-email__input-email').type('intanaza101@gmail.com');
    cy.get('#page-login__tabs-email__input-password').type('Intantester123_');
    cy.get('#page-login__button-login').click();

    // Expect user redirected to homepage and logged in
    cy.url().should('eq', `${baseUrl}/home`);
    cy.get('#search-all-product').should('exist');
  });

  // TC_LOGIN_003
  it.skip('TC_LOGIN_003 - Verify login with wrong password (phone)', () => {
    cy.get('#page-login__tabs-number__input-number').type('811234343531');
    cy.get('#page-login__tabs-email__input-password').type('Wrongpassword123_');
    cy.get('#page-login__button-login').click();

    // Expect user redirected to homepage and logged in
    cy.url().should('eq', `${baseUrl}/login`);
    cy.contains('Nomor telepon atau password salah. Coba ulangi.').should('exist');
  });
  
  // TC_LOGIN_004 
  it.skip('TC_LOGIN_004 - Verify login with wrong password (email)', () => {
    cy.get('#page-login__tabs-email').click();
    cy.get('#page-login__tabs-email__input-email').type('intanaza101@gmail.com');
    cy.get('#page-login__tabs-email__input-password').type('Wrongpassword123_');
    cy.get('#page-login__button-login').click();
    // Expect validation error message
    cy.contains('Email atau password salah. Coba ulangi.').should('exist');
  });

  // TC_ADDRESS_001
  it.skip('TC_ADDRESS_001 - Add a new valid shipping address', () => {
    login();
    cy.get('[class="chakra-text HeaderQbee_location-name__JXRsL css-0"]').click();
    cy.get('[class="styles_modal-body__container-button__eopHN btn btn-secondary"]').click();

    // Fill in address form
    cy.get('#add-address__label-text').type('Rumah Intan');
    cy.get('#add-address__receiver-name').type('Intan Aza');
    cy.get('#add-address__receiver-number').type('811234343531');
    cy.get('#react-select-2-input').type('DI Yogyakarta{enter}');
    cy.get('#react-select-3-input').type('Sleman{enter}');
    cy.get('#react-select-4-input').type('Depok{enter}');
    cy.get('#react-select-5-input').type('Maguwoharjo{enter}');
    cy.get('#add-address__receiver-full-address').type('Jl. Yudistira No. 7');
    cy.get('#add-address__receiver-notes').type('Pagar hitam, depan angkringan');
    cy.get('[class="chakra-checkbox__control css-33h1ga"]').click();
    cy.get('#add-address__submit-button').click(); 

    cy.contains('Alamat berhasil ditambah').should('exist');
    cy.contains('Rumah Intan').should('exist');
  });

  // TC_ADDRESS_002
  it.skip('TC_ADDRESS_002 - Submit address form with missing required field', () => {
    login();
    cy.get('[class="chakra-text HeaderQbee_location-name__JXRsL css-0"]').click();
    cy.get('[class="styles_modal-body__container-button__eopHN btn btn-secondary"]').click();

    // Fill in address form
    cy.get('#add-address__label-text').type('Rumah Intan');
    cy.get('#add-address__receiver-name').type('Intan Aza');
    cy.get('#add-address__receiver-number').type('811234343531');
    cy.get('#add-address__submit-button').click(); 
    cy.contains('Mohon isi data alamat lengkap').should('exist');
  });

  // TC_PROD_001
  it.skip('TC_PROD_001 - Verify product search functionality', () => {
    login();
    const productName = 'Collagen';
    cy.get('#search-all-product').click()
    cy.get('[class="chakra-input searchModal_input__Upr4h css-fc510t"]').type(`${productName}{enter}`);
    
    // Verify search results
    cy.url().should('include', `shop?q=${encodeURIComponent(productName)}`);
    cy.get('h2').each(($el) => {
      expect($el.text().toLowerCase()).to.include(productName.toLowerCase());
    });
  });

  // TC_PROD_002
  it.skip('TC_PROD_002 - Searching no results', () => {
    login();
    const productName = 'abcxyz';
    cy.get('#search-all-product').click()
    cy.get('[class="chakra-input searchModal_input__Upr4h css-fc510t"]').type(`${productName}{enter}`);
    
    // Verify search results
    cy.url().should('include', `shop?q=${encodeURIComponent(productName)}`);
    cy.contains('0 pencarian ditemukan').should('exist');
  });

  // TC_CART_001 & TC_CART_002
  it('TC_CART_001 - Add product to cart and verify', () => {
    login();
    const productName = 'Collagen';
    cy.get('#search-all-product').click()
    cy.get('[class="chakra-input searchModal_input__Upr4h css-fc510t"]').type(`${productName}{enter}`);
    
    // Add first product to cart
    cy.get('h2').contains("Fitclair Collagen Drink").click();
    cy.url().should('include', `product-details/Fitclair-Collagen-Drink`);
    cy.scrollTo(0, '50%'); 

    for (let i = 1; i < 9; i++) {
      cy.get('#productDetail-button-cart').click();
      cy.contains('Pesanan ditambahkan').should('exist');
      cy.get('span[style="font-size: 12px;"]').should('have.text', i);
      cy.wait(3000);
    }

  });

  

});
