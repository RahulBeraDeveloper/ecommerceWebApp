// import React from 'react';
// import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

// export default function App() {
//   return (
//     <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
//       <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
//         <div className='me-5 d-none d-lg-block'>
//           <span>Get connected with us on social networks:</span>
//         </div>

//         <div>
//           <a href='' className='me-4 text-reset'>
//             <MDBIcon color='secondary' fab icon='facebook-f' />
//           </a>
//           <a href='' className='me-4 text-reset'>
//             <MDBIcon color='secondary' fab icon='twitter' />
//           </a>
//           <a href='' className='me-4 text-reset'>
//             <MDBIcon color='secondary' fab icon='google' />
//           </a>
//           <a href='' className='me-4 text-reset'>
//             <MDBIcon color='secondary' fab icon='instagram' />
//           </a>
//           <a href='' className='me-4 text-reset'>
//             <MDBIcon color='secondary' fab icon='linkedin' />
//           </a>
//           <a href='' className='me-4 text-reset'>
//             <MDBIcon color='secondary' fab icon='github' />
//           </a>
//         </div>
//       </section>

//       <section className=''>
//         <MDBContainer className='text-center text-md-start mt-5'>
//           <MDBRow className='mt-3'>
//             <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
//               <h6 className='text-uppercase fw-bold mb-4'>
//                 <MDBIcon color='secondary' icon='gem' className='me-3' />
//                 PrimeTech Store
//               </h6>
//               <p>
//               Welcome to PrimeTech Store, your one-stop shop for premium tech essentials! We offer top-quality laptops, smartphones, monitors, keyboards, and more. Upgrade your tech today with PrimeTech Store—where innovation meets excellence!.
//               </p>
//             </MDBCol>

    

//             <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
//               <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
//               <p>
//                 <MDBIcon color='secondary' icon='home' className='me-2' />
//                Kolkata, NY 70012, India
//               </p>
//               <p>
//                 <MDBIcon color='secondary' icon='envelope' className='me-3' />
//                 info@example.com
//               </p>
//               <p>
//                 <MDBIcon color='secondary' icon='phone' className='me-3' /> + 91 985 658 5211
//               </p>
//               <p>
//                 <MDBIcon color='secondary' icon='print' className='me-3' /> + 91 985 658 5222
//               </p>
//             </MDBCol>
//           </MDBRow>
//         </MDBContainer>
//       </section>

//       <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
//         © 2025 Copyright:
//         <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
//         PrimeTech Store
//         </a>
//       </div>
//     </MDBFooter>
//   );
// }

import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="#" className="me-4 text-reset">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" className="me-4 text-reset">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="#" className="me-4 text-reset">
            <i className="bi bi-google"></i>
          </a>
          <a href="#" className="me-4 text-reset">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="#" className="me-4 text-reset">
            <i className="bi bi-linkedin"></i>
          </a>
          <a href="#" className="me-4 text-reset">
            <i className="bi bi-github"></i>
          </a>
        </div>
      </section>

      <section>
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="bi bi-gem me-3"></i>
                PrimeTech Store
              </h6>
              <p>
                Welcome to PrimeTech Store, your one-stop shop for premium tech
                essentials! We offer top-quality laptops, smartphones, monitors,
                keyboards, and more. Upgrade your tech today with PrimeTech Store—
                where innovation meets excellence!
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4 mt-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="bi bi-house me-2"></i>
                Kolkata, NY 70012, India
              </p>
              <p>
                <i className="bi bi-envelope me-3"></i>
                info@example.com
              </p>
              <p>
                <i className="bi bi-phone me-3"></i> +91 985 658 5211
              </p>
              <p>
                <i className="bi bi-printer me-3"></i> +91 985 658 5222
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4 mt-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
      >
        © 2025 Copyright:
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          PrimeTech Store
        </a>
      </div>
    </MDBFooter>
  );
}
