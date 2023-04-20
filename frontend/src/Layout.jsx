import React from "react";

import  {Component} from 'react';  

function Layout(HocComponent) {
 
    return class extends Component{  
        render(){  
            return (  
                <div>  
                    From LayOut
                    <HocComponent></HocComponent>  
                </div>  
  
            );  
        }  
    }
}


export default Layout;