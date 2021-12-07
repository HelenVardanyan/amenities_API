import { RESPONSE_STATUS_CODES } from '../../../constants/statusCodes';
import { UNIT_API_ROUTES, AMENITIES_SPACES, RESERVATIONS } from '../../../constants/routes';


describe('Unit ID Amenities, Reservations, Reservation ID API Routes for Tenant (PATCH)', () => {
  const headers = {
    'Content-type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json',
  };

  const unit_id = Cypress.env('UNIT_ID_2');
  const reservation_id = Cypress.env('RESERVATION_ID');
  const requestBody = {
    "data": {
      "type": "reservation",
      "id": reservation_id,
      "attributes": {
        "name": "Lena Test AUTOMATION RESERVATION",
        "maximum_occupancy": "80",
        "visitor_instructions": "Some long and intersting text",
        "fee_cents": "100",

      }
    }
  }

  before(() => {
    cy.login().then((res) => {
      const {
        body: { access_token },
      } = res;
      headers['Authorization'] = `Bearer ${access_token}`;
    });
  });

  it('Should edit exact reservation', () => {
    cy.request({
      headers,
      url: `${UNIT_API_ROUTES.UNITS}/${unit_id}/${AMENITIES_SPACES.AMENITY_SPACES}/${RESERVATIONS.RESERVATIONS}/${reservation_id}`,
      method: 'PATCH',
      body: requestBody,
    }).then((res) => {
      const { status, body, data } = res;
      cy.log(body)
      expect(status).to.equal(RESPONSE_STATUS_CODES.CREATED);
      expect(body).to.have.property('data');
      expect(typeof body.data).to.equal('object');
      expect(body.data).to.have.property('id')
      expect(body.data).to.have.property('type')
      expect(body.data.attributes).to.have.property('name');
      expect(body.data.attributes).to.have.property('maximum_occupancy');
      expect(body.data.attributes).to.have.property('visitor_instructions');
      expect(body.data.attributes).to.have.property('fee_cents');
      
    });
  });

  it('Should not edit exact reservation with wrong ID', () => {
    const wrong_reservation_id = Cypress.env('WRONG_RESERVATION_ID');
    cy.request({
      headers,
      url: `${UNIT_API_ROUTES.UNITS}/${unit_id}/${AMENITIES_SPACES.AMENITY_SPACES}/${RESERVATIONS.RESERVATIONS}/${wrong_reservation_id}`,
      method: 'PATCH',
      body: requestBody,
      failOnStatusCode: false,
    }).then((res) => {
      const { status } = res;
      expect(status).to.equal(RESPONSE_STATUS_CODES.NOT_FOUND);
      });
      
    });

});

describe('Unit ID Amenities, Reservations, Reservation ID API Routes for an unauthorized Tenant (PATCH)', () => {
  const headers = {
    'Content-type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json',
  };
  const reservation_id = Cypress.env('RESERVATION_ID');
  const requestBody = {
    "data": {
      "type": "reservation",
      "id": reservation_id,
      "attributes": {
        "name": "Lena Test AUTOMATION RESERVATION",
        "maximum_occupancy": "80",
        "visitor_instructions": "Some long and intersting text",
        "fee_cents": "100",

      }
    }
  }


  it('Should not edit exact reservation', () => {
    const unit_id = Cypress.env('UNIT_ID_2');
    cy.request({
      headers,
      url: `${UNIT_API_ROUTES.UNITS}/${unit_id}/${AMENITIES_SPACES.AMENITY_SPACES}/${RESERVATIONS.RESERVATIONS}/${reservation_id}`,
      method: 'PATCH',
      body: requestBody,
      failOnStatusCode: false,
    }).then((res) => {
      const { status } = res;
      expect(status).to.equal(RESPONSE_STATUS_CODES.UNAUTHORIZED);
      });
      
    });
  });
