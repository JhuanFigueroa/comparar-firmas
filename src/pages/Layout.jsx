import React from "react";

const Layout=(props)=>{
    return(

        <main className="main-container">
            {props.children}
        </main>
    )
}

export default Layout