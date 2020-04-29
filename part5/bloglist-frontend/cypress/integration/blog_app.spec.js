describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Rohit Das',
      username: 'rohitvdas',
      password: 'right'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('rohitvdas')
      cy.get('input:last').type('right')
      cy.contains('login').click()

      cy.contains('Rohit Das logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type('rohitvdas')
      cy.get('input:last').type('wrong')
      cy.contains('login').click()

      cy.get('html').should('not.contain', 'Rohit Das logged in')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'rohitvdas', password: 'right'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Title')
      cy.get('#author').type('Au Thor')
      cy.get('#url').type('url.com')
      cy.get('#create').click()

      cy.contains('Title Au Thor')
    })
  })
})