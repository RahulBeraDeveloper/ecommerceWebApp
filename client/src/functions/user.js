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
    



    export const saveUserAddress = async (authtoken, address, phone) =>
      await axios.post(
        `${process.env.REACT_APP_API}/user/address`,
        { address, phone }, 
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
        export const createCashOrderForUser = async (
          authtoken,
          COD,
          couponTrueOrFalse
        ) =>
          await axios.post(
            `${process.env.REACT_APP_API}/user/cash-order`,
            { couponApplied: couponTrueOrFalse, COD },
            {
              headers: {
                authtoken,
              },
            }
          );
        
          export const getAddressPhone = async (authtoken, email) => {
            try {
              const { data } = await axios.post(`${process.env.REACT_APP_API}/user/getAddress`, { email }, {
                headers: {
                  authtoken: authtoken, // Ensure this token is valid
                },
              });
              return data; // Contains address and phone
            } catch (err) {
              console.error("Error fetching address and phone:", err.response ? err.response.data : err.message);
              throw err;
            }
          };
          
          export const getUserDetails = async (authtoken) =>
            await axios.get(`${process.env.REACT_APP_API}/user/details`, {
              headers: {
                authtoken: authtoken, // Ensure this token is valid
              },
            });




          

            export const updateUserDetailsById = async (userId, updatedFields, authtoken) =>
              await axios.put(
                `${process.env.REACT_APP_API}/user/${userId}/update`,
                updatedFields, // Pass phone and address in the request body
                {
                  headers: {
                    authtoken: authtoken, // Ensure this token is valid
                  },
                }
              );
            