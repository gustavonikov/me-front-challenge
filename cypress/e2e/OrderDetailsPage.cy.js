import ORDER_DATA_MOCK from '../fixtures/orders.json'

const formatCreatedAt = (dateString) => {
  if (dateString == null) return ''

  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `Created on ${year}-${month}-${day} at ${hours}:${minutes}:${seconds}`
}

describe('OrderDetailsPage', () => {
  const API_URL = '**/orders/1'
  const FRONT_END_PATH = '/orders-details/1'

  context('Desktop Layout', () => {
    beforeEach(() => {
      cy.viewport(1440, 900)
    })

    context('Happy Path', () => {
      beforeEach(() => {
        cy.intercept('GET', API_URL, {
          statusCode: 200,
          body: ORDER_DATA_MOCK,
        }).as('fetchOrders')
        cy.visit(FRONT_END_PATH)
        cy.wait('@fetchOrders')
      })

      it('should display the header section with correct data', () => {
        cy.getByTestId('pre-order-number').should('contain', ORDER_DATA_MOCK.header.number)
        cy.getByTestId('purchase-value').should('contain', `${ORDER_DATA_MOCK.header.currency} ${ORDER_DATA_MOCK.header.price}`)
        cy.getByTestId('pre-order-status').should('contain', ORDER_DATA_MOCK.header.status)
        cy.getByTestId('buyer-name').should('contain', ORDER_DATA_MOCK.header.buyer)
        cy.getByTestId('pre-order-serial').should('contain', `#ME${ORDER_DATA_MOCK.header.serial}`)
        cy.getByTestId('creation-date').should('contain', formatCreatedAt(ORDER_DATA_MOCK.header.createdAt))

        cy.getByTestId('company-details-name').should('contain', ORDER_DATA_MOCK.header.contact.name)
        cy.getByTestId('company-details-email').should('contain', ORDER_DATA_MOCK.header.contact.email)
        cy.getByTestId('company-details-phone').should('contain', ORDER_DATA_MOCK.header.contact.phone)
        cy.getByTestId('company-details-fax').should('contain', ORDER_DATA_MOCK.header.contact.fax)
      })

      it('should display the supplier section with correct data', () => {
        cy.getByTestId('supplier-info').within(() => {
          cy.getByTestId('card-billing-address').within(() => {
            cy.getByTestId('card-label').should('have.text', 'TESTING CD')
            cy.getByTestId('company-name').should('have.text', ORDER_DATA_MOCK.supplier.name)
            cy.getByTestId('company-code').should('have.text', `#${ORDER_DATA_MOCK.supplier.code}`)

            cy.getByTestId('company-details-name').should('have.text', ORDER_DATA_MOCK.supplier.contact.name)
            cy.getByTestId('company-details-email').should('have.text', ORDER_DATA_MOCK.supplier.contact.email)
            cy.getByTestId('company-details-phone').should('have.text', ORDER_DATA_MOCK.supplier.contact.phone)
            cy.getByTestId('company-details-fax').should('have.text', ORDER_DATA_MOCK.supplier.contact.fax)
          })
        })
      })

      it('should display the address section with correct data and behavior', () => {
        cy.get('.addresses-wrapper').should('not.be.visible')
        cy.contains('h2', 'Addresses').click()
        cy.get('.addresses-wrapper').should('be.visible')

        cy.getByTestId('addresses-section').find('[data-testid="card-billing-address"]').should('have.length', ORDER_DATA_MOCK.addresses.length)
        cy.getByTestId('addresses-section').find('[data-testid="card-billing-address"]').each(($el, index) => {
          const address = ORDER_DATA_MOCK.addresses[index]
          cy.wrap($el).within(() => {
            cy.getByTestId('card-label').should('have.text', address.label)
            cy.getByTestId('company-name').should('have.text', address.name)
          })
        })
      })
    })

    context('Loading State', () => {
      beforeEach(() => {
        cy.intercept('GET', API_URL, {
          delay: 2000,
          statusCode: 200,
          body: ORDER_DATA_MOCK,
        }).as('fetchOrders')
        cy.visit(FRONT_END_PATH)
      })

      it('should show header skeletons while loading', () => {
        cy.getByTestId('pre-order-badge-skeleton').should('be.visible')
        cy.getByTestId('buyer-name-skeleton').should('be.visible')
        cy.getByTestId('purchase-value-skeleton').should('be.visible')
        cy.getByTestId('pre-order-status-skeleton').should('be.visible')
        cy.getByTestId('pre-order-creation-date').should('be.visible')

        cy.wait('@fetchOrders')

        cy.getByTestId('pre-order-number').should('be.visible')
        cy.getByTestId('pre-order-badge-skeleton').should('not.exist')
      })

      it('should show supplier skeleton while loading', () => {
        cy.getByTestId('supplier-info').within(() => {
          cy.getByTestId('card-billing-address-skeleton').should('be.visible').within(() => {
            cy.getByTestId('card-billing-address-label-skeleton-filled').should('be.visible')
            cy.getByTestId('company-name-wrapper-skeleton').should('be.visible')
          })
        })

        cy.wait('@fetchOrders')

        cy.getByTestId('supplier-info').should('be.visible')
        cy.getByTestId('card-billing-address-skeleton').should('not.exist')
      })
    })

    context('Error State', () => {
      beforeEach(() => {
        cy.intercept('GET', API_URL, {
          statusCode: 500,
        }).as('fetchOrders')

        cy.visit(FRONT_END_PATH)
        cy.wait('@fetchOrders')
      })

      it('should display an error state if the API fails', () => {
        cy.contains('Failed to load order details.').should('be.visible')
        cy.contains('There was an issue retrieving the order information. Please try again.').should('be.visible')
        cy.contains('Try again').should('be.visible')
      })
    })

    context('Layout Responsiveness', () => {
      beforeEach(() => {
        cy.intercept('GET', API_URL, {
          statusCode: 200,
          body: ORDER_DATA_MOCK,
        }).as('fetchOrders')
        cy.visit(FRONT_END_PATH)
        cy.wait('@fetchOrders')
      })

      it('should display company details in columns on desktop', () => {
        cy.get('.company-details.-layout-columns').should('have.css', 'flex-direction', 'row')
      })

      it('should display company details fields side-by-side with layout="rows" on desktop', () => {
        cy.get('.company-details.-layout-rows').within(() => {
          cy.get('.communication-details').children().then(($children) => {
            const firstItemTop = $children.eq(0).offset().top
            const secondItemTop = $children.eq(1).offset().top
            expect(firstItemTop).to.be.closeTo(secondItemTop, 10)
          })
        })
      })

      it('should display addresses cards side-by-side on desktop', () => {
        cy.contains('h2', 'Addresses').click()
        cy.getByTestId('addresses-section').find('[data-testid="card-billing-address"]').then(($cards) => {
          const card1Top = $cards.eq(0).offset().top
          const card2Top = $cards.eq(1).offset().top
          expect(card1Top).to.be.closeTo(card2Top, 10)
        })
      })

      it('should display company details skeleton side-by-side on desktop', () => {
        cy.intercept('GET', API_URL, {
          delay: 2000,
          statusCode: 200,
          body: ORDER_DATA_MOCK,
        }).as('fetchOrders')
        cy.visit(FRONT_END_PATH)

        cy.getByTestId('company-details-skeleton-wrapper').children().then(($skeletons) => {
          const skeleton1Top = $skeletons.eq(0).offset().top
          const skeleton2Top = $skeletons.eq(1).offset().top
          expect(skeleton1Top).to.be.closeTo(skeleton2Top, 10)
        })
      })
    })
  })

  context('Mobile Layout', () => {
    beforeEach(() => {
      cy.viewport('iphone-x')
    })

    context('Happy Path', () => {
      beforeEach(() => {
        cy.intercept('GET', API_URL, {
          statusCode: 200,
          body: ORDER_DATA_MOCK,
        }).as('fetchOrders')
        cy.visit(FRONT_END_PATH)
        cy.wait('@fetchOrders')
      })

      it('should display the header section with correct data', () => {
        cy.getByTestId('pre-order-number').should('contain', ORDER_DATA_MOCK.header.number)
        cy.getByTestId('purchase-value').should('contain', `${ORDER_DATA_MOCK.header.currency} ${ORDER_DATA_MOCK.header.price}`)
        cy.getByTestId('pre-order-status').should('contain', ORDER_DATA_MOCK.header.status)
        cy.getByTestId('buyer-name').should('contain', ORDER_DATA_MOCK.header.buyer)
        cy.getByTestId('pre-order-serial').should('contain', `#ME${ORDER_DATA_MOCK.header.serial}`)
        cy.getByTestId('creation-date').should('contain', formatCreatedAt(ORDER_DATA_MOCK.header.createdAt))

        cy.getByTestId('company-details-name').should('contain', ORDER_DATA_MOCK.header.contact.name)
        cy.getByTestId('company-details-email').should('contain', ORDER_DATA_MOCK.header.contact.email)
        cy.getByTestId('company-details-phone').should('contain', ORDER_DATA_MOCK.header.contact.phone)
        cy.getByTestId('company-details-fax').should('contain', ORDER_DATA_MOCK.header.contact.fax)
      })

      it('should display the supplier section with correct data', () => {
        cy.getByTestId('supplier-info').within(() => {
          cy.getByTestId('card-billing-address').within(() => {
            cy.getByTestId('card-label').should('have.text', 'TESTING CD')
            cy.getByTestId('company-name').should('have.text', ORDER_DATA_MOCK.supplier.name)
            cy.getByTestId('company-code').should('have.text', `#${ORDER_DATA_MOCK.supplier.code}`)

            cy.getByTestId('company-details-name').should('have.text', ORDER_DATA_MOCK.supplier.contact.name)
            cy.getByTestId('company-details-email').should('have.text', ORDER_DATA_MOCK.supplier.contact.email)
            cy.getByTestId('company-details-phone').should('have.text', ORDER_DATA_MOCK.supplier.contact.phone)
            cy.getByTestId('company-details-fax').should('have.text', ORDER_DATA_MOCK.supplier.contact.fax)
          })
        })
      })

      it('should display the address section with correct data and behavior', () => {
        cy.get('.addresses-wrapper').should('not.be.visible')
        cy.contains('h2', 'Addresses').click()
        cy.get('.addresses-wrapper').should('be.visible')

        cy.getByTestId('addresses-section').find('[data-testid="card-billing-address"]').should('have.length', ORDER_DATA_MOCK.addresses.length)
        cy.getByTestId('addresses-section').find('[data-testid="card-billing-address"]').each(($el, index) => {
          const address = ORDER_DATA_MOCK.addresses[index]
          cy.wrap($el).within(() => {
            cy.getByTestId('card-label').should('have.text', address.label)
            cy.getByTestId('company-name').should('have.text', address.name)
          })
        })
      })
    })

    context('Loading State', () => {
      beforeEach(() => {
        cy.intercept('GET', API_URL, {
          delay: 2000,
          statusCode: 200,
          body: ORDER_DATA_MOCK,
        }).as('fetchOrders')
        cy.visit(FRONT_END_PATH)
      })

      it('should show header skeletons while loading', () => {
        cy.getByTestId('pre-order-badge-skeleton').should('be.visible')
        cy.getByTestId('buyer-name-skeleton').should('be.visible')
        cy.getByTestId('purchase-value-skeleton').should('be.visible')
        cy.getByTestId('pre-order-status-skeleton').should('be.visible')
        cy.getByTestId('pre-order-creation-date').should('be.visible')

        cy.wait('@fetchOrders')

        cy.getByTestId('pre-order-number').should('be.visible')
        cy.getByTestId('pre-order-badge-skeleton').should('not.exist')
      })

      it('should show supplier skeleton while loading', () => {
        cy.getByTestId('supplier-info').within(() => {
          cy.getByTestId('card-billing-address-skeleton').should('be.visible').within(() => {
            cy.getByTestId('card-billing-address-label-skeleton-filled').should('be.visible')
            cy.getByTestId('company-name-wrapper-skeleton').should('be.visible')
          })
        })

        cy.wait('@fetchOrders')

        cy.getByTestId('supplier-info').should('be.visible')
        cy.getByTestId('card-billing-address-skeleton').should('not.exist')
      })
    })

    context('Error State', () => {
      beforeEach(() => {
        cy.intercept('GET', API_URL, {
          statusCode: 500,
        }).as('fetchOrders')

        cy.visit(FRONT_END_PATH)
        cy.wait('@fetchOrders')
      })

      it('should display an error state if the API fails', () => {
        cy.contains('Failed to load order details.').should('be.visible')
        cy.contains('There was an issue retrieving the order information. Please try again.').should('be.visible')
        cy.contains('Try again').should('be.visible')
      })
    })

    context('Layout Responsiveness', () => {
      beforeEach(() => {
        cy.intercept('GET', API_URL, {
          statusCode: 200,
          body: ORDER_DATA_MOCK,
        }).as('fetchOrders')
        cy.visit(FRONT_END_PATH)
        cy.wait('@fetchOrders')
      })

      it('should display company details fields in a single column on mobile', () => {
        cy.get('.company-details.-layout-columns').should('have.css', 'flex-direction', 'column')

        cy.get('.communication-details').children().then(($children) => {
          const firstItemTop = $children.eq(0).offset().top
          const secondItemTop = $children.eq(1).offset().top
          expect(secondItemTop).to.be.greaterThan(firstItemTop)
        })
      })

      it('should display company details fields stacked with layout="rows" on mobile', () => {
        cy.get('.company-details.-layout-rows').within(() => {
          cy.get('.communication-details').children().then(($children) => {
            const firstItemTop = $children.eq(0).offset().top
            const secondItemTop = $children.eq(1).offset().top
            expect(secondItemTop).to.be.greaterThan(firstItemTop)
          })
        })
      })

      it('should display addresses cards in a single column on mobile', () => {
        cy.contains('h2', 'Addresses').click()

        cy.getByTestId('addresses-section').find('[data-testid="card-billing-address"]').then(($cards) => {
          const card1Top = $cards.eq(0).offset().top
          const card2Top = $cards.eq(1).offset().top
          expect(card2Top).to.be.greaterThan(card1Top)
        })
      })

      it('should display company details skeleton in a single column on mobile', () => {
        cy.intercept('GET', API_URL, {
          delay: 2000,
          statusCode: 200,
          body: ORDER_DATA_MOCK,
        }).as('fetchOrders')
        cy.visit(FRONT_END_PATH)

        cy.getByTestId('company-details-skeleton-wrapper').children().then(($skeletons) => {
          const skeleton1Top = $skeletons.eq(0).offset().top
          const skeleton2Top = $skeletons.eq(1).offset().top
          expect(skeleton2Top).to.be.greaterThan(skeleton1Top)
        })
      })
    })
  })
})
