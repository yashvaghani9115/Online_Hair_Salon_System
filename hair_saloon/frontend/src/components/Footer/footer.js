import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function Footer() {
    return (
        <MDBFooter bgColor='dark' className='text-center text-lg-start text-white'>
            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                <div className='me-5 d-none d-lg-block'>
                    <span>Get connected with us on social networks:</span>
                </div>

                <div>
                    <a href='#!' className='me-4 text-reset'>
                        <i className='fab fa-facebook-f'></i>
                    </a>
                    <a href='#!' className='me-4 text-reset'>
                        <i className='fab fa-twitter'></i>
                    </a>
                    <a href='#!' className='me-4 text-reset'>
                        <i className='fab fa-google'></i>
                    </a>
                    <a href='#!' className='me-4 text-reset'>
                        <i className='fab fa-instagram'></i>
                    </a>
                </div>
            </section>

            <section className=''>
                <div className='container text-center text-md-start mt-2'>
                    <div className='row mt-3'>
                        <div className='col-md-3 col-lg-4 col-xl-3 mx-auto'>
                            <p>
                                <i className='fas fa-home me-3'></i> Gujarat, India
                            </p>
                        </div>

                        <div className='col-md-3 col-lg-3 col-xl-3 mx-auto '>
                            <p>
                                <i className='fas fa-envelope me-3'></i>
                                salon0248@gmail.com
                            </p>

                        </div>

                        <div className='col-md-3 col-lg-2 col-xl-2 mx-auto'>
                            <p>
                                <i className='fas fa-phone me-3'></i> + 91 2340 567 880
                            </p>
                        </div>

                        <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 '>
                            <p>
                                <i className='fas fa-print me-3'></i> + 91 2340 567 890
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2022 Copyright :&nbsp;
                <a className='text-reset fw-bold' href='#!'>
                    HairSalon.com
                </a>
            </div>
        </MDBFooter>
    );
}