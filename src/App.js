import * as React from "react";
import Router from "./components/Router";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";

import "react-toastify/dist/ReactToastify.css";

class App extends React.Component {
    render() {
        console.log("-------------2--------------");
        return (
            <React.Fragment>
                <ToastContainer />
                {/* header is shared between routes */}
                {/* TODO: @Nitin how can we give the Header component the user role? */}
                <div className="flex flex-col min-h-screen">
                    {/* <Header /> */}
                    <Router />
                </div>
            </React.Fragment>
        );
    }
}

export default App;
