import axios from "axios";

export const userCart = async (cart, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );



  export const getUserCart = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
      headers: {
        authtoken,
      },
    });
  

    export const emptyUserCart = async (authtoken) =>
      await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
        headers: {
          authtoken,
        },
      });
    
    export const saveUserAddress = async (authtoken, address) =>
      await axios.post(
        `${process.env.REACT_APP_API}/user/address`,
        { address },
        {
          headers: {
            authtoken,
          },
        }
      );


    // export const saveUserAddress = async (authtoken, { firstName, lastName, companyName, address }) => {
    //   try {
    //     const response = await axios.post(
    //       `${process.env.REACT_APP_API}/user/address`,
    //       { firstName, lastName, companyName, address },
    //       {
    //         headers: {
    //           authtoken,
    //         },
    //       }
    //     );
    //     return response; // return the response from the server
    //   } catch (error) {
    //     console.error("Error saving user address:", error);
    //     throw error; // propagate the error for handling in the component
    //   }
    // };
    

    // Function to get the user's saved address
