import { RESPONSE_STATUS_CODES } from '../../../constants/statusCodes';
import { UNIT_API_ROUTES, AMENITIES_SPACES, RESERVATIONS, DEVICES } from '../../../constants/routes';


describe('Unit ID Amenities API Routes Reservations, Devices for Tenant', () => {
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

  it('Should access unit ID Amenities Reservations, Devices', () => {
    const props = ['self', 'first', 'last', 'next', 'prev'];
    const unit_id = Cypress.env('UNIT_ID_2');
    cy.request({
      headers,
      url: `${UNIT_API_ROUTES.UNITS}/${unit_id}/${AMENITIES_SPACES.AMENITY_SPACES}/${RESERVATIONS.RESERVATIONS}/${DEVICES.DEVICES}`,
      method: 'GET',
    }).then((res) => {
      const { status, body } = res;
      cy.log(body)
      expect(status).to.equal(RESPONSE_STATUS_CODES.SUCCESS);
      expect(body).to.have.property('data');
      expect(typeof body.data).to.equal('object');
      expect(body).to.have.property('links');
      props.map((prop) => {
        expect(body.links).to.have.property(prop);
      });
      
    });
  });
});

describe('Unit ID Amenities API Routes Reservations, Devices for an unauthorized Tenant', () => {
    const headers = {
      'Content-type': 'application/vnd.api+json',
      Accept: 'application/vnd.api+json',
    };
  
  
    it('Should not access unit ID Amenities Reservations, Devices', () => {
      const unit_id = Cypress.env('UNIT_ID_2');
      cy.request({
        headers,
        url: `${UNIT_API_ROUTES.UNITS}/${unit_id}/${AMENITIES_SPACES.AMENITY_SPACES}/${RESERVATIONS.RESERVATIONS}/${DEVICES.DEVICES}`,
        method: 'GET',
        failOnStatusCode: false,
      }).then((res) => {
        const { status } = res;
        expect(status).to.equal(RESPONSE_STATUS_CODES.UNAUTHORIZED);
        });
        
      });
    });