describe("E-commerce App", () => {
  
    beforeEach(() => {      
      cy.visit('http://localhost:3000')
    });
  
    it("should load the home page", () => {
        cy.url().should("eq", "http://localhost:3000/");
    });
  
    it("should display the navigation bar", () => {
      cy.get('nav').should('be.visible');
    });
  
    it("should have a link to the Produkty page", () => {
      cy.get('nav').contains('Produkty');
    });
  
    it("should have a link to the Koszyk page", () => {
      cy.get('nav').contains('Koszyk');
    });
  
    it("should have a link to the Platnosci page", () => {
      cy.get('nav').contains('Płatności');
    });
      
    it("should navigate to the Produkty page", () => {
      cy.get('nav').contains('Produkty').click();
      cy.url().should("include", "/produkty");  
    });
  
    it("should navigate to the Koszyk page", () => {
      cy.get('nav').contains('Koszyk').click();
      cy.url().should("include", "/koszyk");      
    });
  
    it("should navigate to the Platnosci page", () => {
      cy.get('nav').contains('Płatności').click();
      cy.url().should("include", "/platnosci");      
    });
      
    it("should add a product to the cart", () => {
        cy.visit('http://localhost:3000/produkty');
      
        cy.get('button').each(($button) => {
            cy.wrap($button).click();
          });

        cy.wait(2000); // Wait for 2 seconds
      
        cy.visit('http://localhost:3000/koszyk');
      
        cy.wait(2000); // Wait for 2 seconds again, in case the cart page also takes some time to load the items
        
        cy.get('h3').contains('Product 1').should('exist'); // Check if 'Product 1' is present on the cart page
      });
      
      
      
    it("should remove a product from the cart", () => {
      cy.get('nav').contains('Koszyk').click();
      cy.get('.cart-item').first().find('button').click();
      cy.get('.cart-item').should('have.length', 0);
    });
    
      // Testing navigation to non-existing page
  it("should display 404 page for non-existing route", () => {
    cy.visit('http://localhost:3000/non-existing-page');
    cy.contains('404');
  });

  // Testing state persistence, assuming you use local storage to store cart items
  it("should persist cart items in local storage", () => {
    cy.get('nav').contains('Produkty').click();
    cy.get('.product').first().find('button').click();
    cy.reload();
    cy.get('nav').contains('Koszyk').click();
    cy.get('.cart-item').should('have.length', 1);
  });

  // Testing empty cart
  it("should display 'No items in cart' when cart is empty", () => {
    cy.get('nav').contains('Koszyk').click();
    cy.contains('No items in cart');
  });

  // Testing add multiple items to cart
  it("should add multiple items to the cart", () => {
    cy.get('nav').contains('Produkty').click();
    cy.get('.product').first().find('button').click();
    cy.get('.product').eq(1).find('button').click();
    cy.get('nav').contains('Koszyk').click();
    cy.get('.cart-item').should('have.length', 2);
  });

  // Testing 'Płatności' page, assuming there is some content like 'Payment information'
  it("should display content on the 'Płatności' page", () => {
    cy.get('nav').contains('Płatności').click();
    cy.contains('Payment information');
  });

  // Testing link to home page (Produkty), assuming the logo links to home
  it("should navigate to home page when clicking the logo", () => {
    cy.get('.logo').click();
    cy.url().should("include", "/produkty");
  });

  // Testing page title, assuming title is 'E-commerce App'
  it("should display the correct page title", () => {
    cy.title().should('equal', 'E-commerce App');
  });

  // Testing that each product has necessary details, like name, image and price
  it("should display name, image and price for each product", () => {
    cy.get('nav').contains('Produkty').click();
    cy.get('.product').each(($product) => {
      cy.wrap($product).find('.product-name').should('be.visible');
      cy.wrap($product).find('.product-image').should('be.visible');
      cy.wrap($product).find('.product-price').should('be.visible');
    });
  });

  // Testing search functionality, assuming there is a search bar
  it("should search for a product", () => {
    cy.get('nav').contains('Produkty').click();
    cy.get('.search-bar').type('Product Name');
    cy.get('.product').should('have.length', 1).and('contain', 'Product Name');
  });

  // Testing sorting functionality, assuming there are options to sort products
  it("should sort products by price", () => {
    cy.get('nav').contains('Produkty').click();
    cy.get('.sort-dropdown').select('Price: Low to High');
    // More checks can be added here to check the actual sorting
  });

  // Testing error handling, assuming you show an error message when adding to cart fails
  it("should display an error when adding to cart fails", () => {
    // Simulating a failure, Cypress can intercept requests and change the response
    cy.intercept(
      { method: 'POST', url: '/api/cart' },
      { statusCode: 500, body: { message: 'An error occurred' } }
    );
    cy.get('nav').contains('Produkty').click();
    cy.get('.product').first().find('button').click();
    cy.contains('An error occurred');
  });

  });
  