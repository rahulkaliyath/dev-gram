import React from 'react';
import {SpinnerContainer, SpinnerOverlay} from './with-spinner.styles';

const WithSpinner = () =>{

return(
        <SpinnerOverlay>
            <SpinnerContainer/>
        </SpinnerOverlay>
)
};


export default WithSpinner;