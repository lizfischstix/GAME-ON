import React from "react";
import Auth from '../../utils/auth';
import { useQuery } from "@apollo/client";
import { QUERY_ME } from '../../utils/queries';


const Dash = () => {
    // Check if the user is logged in
    if (!Auth.loggedIn()) {
        return (
            <>
                <Grid container justifyContent="space-around" sx={{ marginTop: 2 }}>
                    <a href="/Login" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="success">
                            Log In
                        </Button>
                    </a>
                    <a href="/Signup" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="success">
                            Sign Up
                        </Button>
                    </a>
                </Grid>
            </>
        );
    };

    //   const addExpense = (event) => {
    //     event.preventDefault();
    //     window.location.assign("/expense");
    //   };

    //   const addIncome = (event) => {
    //     event.preventDefault();
    //     window.location.assign("/income");
    //   };

    //   const { loading, data } = useQuery(QUERY_ME, {
    //     fetchPolicy: "no-cache",
    //   });

    //   // Handle loading state
    //   if (loading) {
    //     // You can use loading skeletons or placeholders here
    //     return <div>Loading...</div>;
    //   }

    //   if (!data) {
    //     Auth.logout();
    //   }

    //   // User data is available
    //   const userInfo = data.me;

    //   const containerStyle = {
    //     border: "1px solid #ddd", // Add a border with a light gray color
    //     borderRadius: "8px", // Add rounded corners
    //     marginBottom: "20px", // Add some spacing between containers
    //     padding: "20px", // Add internal padding
    //     marginTop: "20px",
    //     background: "white",
    //     display: "flex",
    //     justifyContent: "center"
    //   };

    //   const buttoncontainer = {
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     marginBottom: "20px",
    //     gap: "50px",
    //   };


    return (
        <></>
    )

}
export default Dash;