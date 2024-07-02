
import "./Layout.css";
import Header from "./Header";
import Nav from "./Nav";
import Aside from "./Aside";
import Footer from "./Footer";

function Layout(props){
    return (
        <>            
            <Header/>
            <Nav/>            
            <main>{props.children}</main>
            {/* <Aside/> */} 
            <Footer/>
        </>
    );
}

export default Layout;