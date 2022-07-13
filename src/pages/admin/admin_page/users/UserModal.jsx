// import { Box, MenuItem, Modal, TextField } from "@mui/material";
// import * as React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { selectUserInfo, selectUserOpen } from "../../../../store/users/selector";
// import { closeModal, updateUserInfo } from "../../../../store/users/usersSlice";
// import { CustomBox } from "../../../../styles/styled_components/styledComponent";

// //MODAL SELECT ROLE
// const roles = [
//   {
//     value: "Client",
//     label: "Client",
//   },
//   {
//     value: "Admin",
//     label: "Admin",
//   },
// ];

// export default function BasicModal() {
//   const dispatch = useDispatch();
//   const open = useSelector(selectUserOpen);
//   const userInfo = useSelector(selectUserInfo);
//   const handleClose = () => dispatch(closeModal());
//   const [role, setRole] = React.useState("");
//   const [state, setState] = React.useState({
//     firstname: "",
//     lastname: "",
//     password: "",
//     email: "",
//     phonenumber: "",
//     role: "",
//   });

//   React.useEffect(() => {
//     if (userInfo) {
//       setState({
//         firstname: userInfo.firstname,
//         lastname: userInfo.lastname,
//         password: userInfo.password,
//         email: userInfo.email,
//         phonenumber: userInfo.phonenumber,
//       });
//       setRole(userInfo.role);
//     } else {
//       setState({
//         firstname: "",
//         lastname: "",
//         password: "",
//         email: "",
//         phonenumber: "",
//         role: "",
//       });
//       setRole("");
//     }
//   }, [userInfo]);

//   const handleOnChange = (event) => {
//     const { name, value } = event.target;
//     setRole(event.target.value);
//     setState({
//       ...state,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (userInfo !== null)
//       return dispatch(updateUserInfo({ state, id: userInfo.id })), dispatch(closeModal());
//   };

//   return (
//     <div>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <CustomBox>
//           {/* MODAL CONTENT */}
//           <Box component="form">
//             <h1 className="admin__title">Edit User</h1>
//             <div className="admin__form">
//               <TextField
//                 size="small"
//                 variant="standard"
//                 fullWidth
//                 required
//                 label="First Name"
//                 name="firstname"
//                 value={state.firstname}
//                 onChange={handleOnChange}
//               />
//               <TextField
//                 size="small"
//                 variant="standard"
//                 required
//                 label="Last Name"
//                 name="lastname"
//                 value={state.lastname}
//                 onChange={handleOnChange}
//               />
//               <TextField
//                 size="small"
//                 variant="standard"
//                 required
//                 label="Email Name"
//                 name="email"
//                 value={state.email}
//                 onChange={handleOnChange}
//               />
//               <TextField
//                 size="small"
//                 variant="standard"
//                 type="password"
//                 required
//                 label="Password"
//                 name="password"
//                 value={state.password}
//                 onChange={handleOnChange}
//               />
//               <TextField
//                 size="small"
//                 variant="standard"
//                 required
//                 label="Phone number"
//                 name="phonenumber"
//                 value={state.phonenumber}
//                 onChange={handleOnChange}
//               />
//               <TextField
//                 size="small"
//                 variant="standard"
//                 required
//                 select
//                 label="Select Role"
//                 name="role"
//                 value={role}
//                 onChange={handleOnChange}
//                 helperText="Please select your role"
//               >
//                 {roles.map((option) => (
//                   <MenuItem key={option.value} value={option.value}>
//                     {option.label}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </div>
//             <div className="admin__btn">
//               <button className="btn btn--success" type="submit" onClick={handleSubmit}>
//                 Submit
//               </button>
//             </div>
//           </Box>
//         </CustomBox>
//       </Modal>
//     </div>
//   );
// }
