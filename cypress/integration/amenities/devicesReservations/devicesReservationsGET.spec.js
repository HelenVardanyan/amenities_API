import { RESPONSE_STATUS_CODES } from '../../../constants/statusCodes';
import { UNIT_API_ROUTES, RESERVATIONS, DEVICES } from '../../../constants/routes';


describe('Unit ID Devices Reservations for Tenant', () => {
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

  it('Should access unit ID Devices Reservations', () => {
    const props = ['self', 'first', 'last', 'next', 'prev'];
    const unit_id = Cypress.env('UNIT_ID_2');
    cy.request({
      headers,
      url: `${UNIT_API_ROUTES.UNITS}/${unit_id}/${DEVICES.DEVICES}/${RESERVATIONS.RESERVATIONS}`,
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

describe('Unit ID Devices Reservations for an unauthorized Tenant', () => {
    const headers = {
      'Content-type': 'application/vnd.api+json',
      Accept: 'application/vnd.api+json',
    };
  
  
    it('Should not access unit ID Devices Reservations', () => {
      const unit_id = Cypress.env('UNIT_ID_2');
      cy.request({
        headers,
        url: `${UNIT_API_ROUTES.UNITS}/${unit_id}/${DEVICES.DEVICES}/${RESERVATIONS.RESERVATIONS}`,
        method: 'GET',
        failOnStatusCode: false,
      }).then((res) => {
        const { status } = res;
        expect(status).to.equal(RESPONSE_STATUS_CODES.UNAUTHORIZED);
        });
        
      });
    });