// const AdminHome = () => {
//   return (
//     <>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         {searchData.length > 0 ? (
//           <tbody>
//             {searchData.map((data) => (
//               <tr key={data._id}>
//                 <td>{data._id}</td>
//                 <td>{data.name}</td>
//                 <td>{data.email}</td>
//                 <td>{data.phoneNumber}</td>
//                 <td>
//                   <button onClick={() => handleDelete(data._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         ) : (
//           <tbody>
//             {userData.map((data) => (
//               <tr key={data._id}>
//                 <td>{data._id}</td>
//                 <td>{data.name}</td>
//                 <td>{data.email}</td>
//                 <td>{data.phoneNumber}</td>
//                 <td>
//                   <button onClick={() => handleDelete(data._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         )}
//       </table>
//     </>
//   );
// };

// export default AdminHome;
