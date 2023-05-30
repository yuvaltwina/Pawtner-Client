// import axios from "axios";
// import Cookies from "js-cookie";
// import { useEffect } from "react";
// import { toast } from "react-hot-toast";
// import { SERVER_URL } from "../utils/data/data";

// useEffect(() => {
//     const verifiedCookie = Cookies.get('verified');
//     if (verifiedCookie) {
//       if (verifiedCookie === 'Successfully verified') {
//         toast.success(verifiedCookie);
//       } else {
//         verifiedCookie && toast.error(verifiedCookie);
//       }
//       Cookies.remove('verified');
//     }
//     let source = axios.CancelToken.source();
//     const checkLoginCookie = async () => {
//       const loginToken = Cookies.get('login');
//       if (loginToken) {
//         try {
//           const loginResponse = await axios.get(
//             SERVER_URL + '/user/loginCookie',
//             {
//               cancelToken: source.token,
//               withCredentials: true,
//             }
//           );
//           const resMessage = loginResponse.data?.message;
//           if (resMessage === 'User exist') {
//             const { phoneNumber, username, email } = loginResponse.data?.data;
//             setUserDetails({
//               username,
//               email,
//               phoneNumber,
//               isLoggedIn: true,
//             });
//           }
//         } catch (err) {}
//       }
//     };
//     checkLoginCookie();
//     return () => {
//       source.cancel();
//     };
//   }, []);
