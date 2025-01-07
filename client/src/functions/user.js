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
    
    // export const saveUserAddress = async (authtoken, address) =>
    //   await axios.post(
    //     `${process.env.REACT_APP_API}/user/address`,
    //     { address },
    //     {
    //       headers: {
    //         authtoken,
    //       },
    //     }
    //   );
    export const saveUserAddress = async (authtoken, address, phone) =>
      await axios.post(
        `${process.env.REACT_APP_API}/user/address`,
        { address, phone }, // Include both address and phone in the request body
        {
          headers: {
            authtoken,
          },
        }
      );
    



      export const applyCoupon = async (authtoken, coupon) =>
        await axios.post(
          `${process.env.REACT_APP_API}/user/cart/coupon`,
          { coupon },
          {
            headers: {
              authtoken,
            },
          }
        );
      


        export const createOrder = async (stripeResponse, authtoken) =>
          await axios.post(
            `${process.env.REACT_APP_API}/user/order`,
            { stripeResponse },
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


    export const getUserOrders = async (authtoken) =>
      await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
        headers: {
          authtoken,
        },
      });


      
      export const getWishlist = async (authtoken) =>
        await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
          headers: {
            authtoken,
          },
        });
      
      export const removeWishlist = async (productId, authtoken) =>
        await axios.put(
          `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
          {},
          {
            headers: {
              authtoken,
            },
          }
        );
      
      export const addToWishlist = async (productId, authtoken) =>
        await axios.post(
          `${process.env.REACT_APP_API}/user/wishlist`,
          { productId },
          {
            headers: {
              authtoken,
            },
          }
        );
      