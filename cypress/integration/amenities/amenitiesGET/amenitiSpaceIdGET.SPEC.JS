import { RESPONSE_STATUS_CODES } from '../../../constants/statusCodes';
import { UNIT_API_ROUTES, AMENITIES_SPACES } from '../../../constants/routes';


describe('Unit ID Amenities ID API Routes for Tenant', () => {
  const headers = {
    'Content-type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json',
  };

  before(() => {
    cy.login().then((res) => {
      const {
        body: { access_token },
      } = res;
      headers['Authorization'] = `Bearer ${access_token}`;
    });
  });

  it('Should access unit ID Amenities ID', () => {
    const amenity_space_id = Cypress.env('AMENITY_SPACE_ID');
    const unit_id = Cypress.env('UNIT_ID_2');
    cy.request({
      headers,
      url: `${UNIT_API_ROUTES.UNITS}/${unit_id}/${AMENITIES_SPACES.AMENITY_SPACES}/${amenity_space_id}`,
      method: 'GET',
    }).then((res) => {
      const { status, body } = res;
      cy.log(body)
      expect(status).to.equal(RESPONSE_STATUS_CODES.SUCCESS);
      expect(body).to.have.property('data');
      expect(typeof body.data).to.equal('object');
      expect(body.data).to.have.property('id');
      expect(body.data).to.have.property('type');
      
    });
  });

  it('Should not access unit ID Amenities ID with wrong ID', () => {
    const wrong_amenity_space_id = Cypress.env('WRONG_AMENITY_SPACE_ID');
    const unit_id = Cypress.env('UNIT_ID_2');
    cy.request({
      headers,
      url: `${UNIT_API_ROUTES.UNITS}/${unit_id}/${AMENITIES_SPACES.AMENITY_SPACES}/${wrong_amenity_space_id}`,
      method: 'GET',
      failOnStatusCode: false,
    }).then((res) => {
      const { status } = res;
      expect(status).to.equal(RESPONSE_STATUS_CODES.NOT_FOUND);
      });
      
    });
});

describe('Unit ID Amenities ID API Routes for an unauthorized Tenant', () => {
  const headers = {
    'Content-type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json',
  };


  it('Should not access unit ID Amenities ID', () => {
    const amenity_space_id = Cypress.env('AMENITY_SPACE_ID');
    const unit_id = Cypress.env('UNIT_ID_2');
    cy.request({
      headers,
      url: `${UNIT_API_ROUTES.UNITS}/${unit_id}/${AMENITIES_SPACES.AMENITY_SPACES}/${amenity_space_id}`,
      method: 'GET',
      failOnStatusCode: false,
    }).then((res) => {
      const { status } = res;
      expect(status).to.equal(RESPONSE_STATUS_CODES.UNAUTHORIZED);
      });
      
    });
  });