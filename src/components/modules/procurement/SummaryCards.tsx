// SLICED THE DATA INTO 3 CARDS and THE 3 CARD WILL ONLY DISPLAY 

import React, { useEffect, useState } from "react";
import { fetchDepartments } from "@/components/service/api/department";
import { useAuth } from "@/components/service/hooks/useAuth";

export const SummaryCards = () => {
  const [departments, setDepartments] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const loadDepartments = async () => {
      if (!token) return;

      try {
        const data = await fetchDepartments(token);
        setDepartments(data || []);
      } catch (error) {
        console.error("Error fetching departments:", error);
        setDepartments([]);
      }
    };

    loadDepartments();
  }, [token]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
      {departments.slice(0, 3).map((dept, index) => (
        <div
          key={dept.mId || index}
          className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">{dept.mName || `Department ${index + 1}`}</p>
              <h2 className="text-2xl font-bold">
                ₱{dept.mBudget?.toLocaleString() || "0.00"}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};







// FETCHING ALL THE API DATA

// import React, { useEffect, useState } from "react";
// import { fetchDepartments } from "@/components/service/api/department";
// import { useAuth } from "@/components/service/hooks/useAuth";

// export const SummaryCards = () => {
//   const [departments, setDepartments] = useState([]);
//   const { token } = useAuth();

//   useEffect(() => {
//     const loadDepartments = async () => {
//       if (!token) return;

//       try {
//         const data = await fetchDepartments(token);
//         setDepartments(data || []);
//       } catch (error) {
//         console.error("Error fetching departments:", error);
//         setDepartments([]);
//       }
//     };

//     loadDepartments();
//   }, [token]);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
//       {departments.map((dept, index) => (
//         <div
//           key={dept.mId || index}
//           className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600"
//         >
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-gray-500 text-sm">{dept.mName || `Department ${index + 1}`}</p>
//               <h2 className="text-2xl font-bold">
//                 ₱{dept.mBudget?.toLocaleString() || "1.00"}
//               </h2>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };





// STATIC DATA

// import { AlertCircle, DollarSign, Users } from "lucide-react";


// export const SummaryCards = () => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
//       <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600">
//         <div className="flex justify-between items-center">
//           <div>
//             <p className="text-gray-500 text-sm">Pending Approvals</p>
//             <h2 className="text-2xl font-bold">4</h2>
//           </div>
//           {/*<div className="p-3 bg-blue-50 rounded-full">
//             <AlertCircle size={24} className="text-blue-600" />
//           </div>*/}
//         </div>
//       </div>
//       <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-600">
//         <div className="flex justify-between items-center">
//           <div>
//             <p className="text-gray-500 text-sm">Total Purchases (April)</p>
//             <h2 className="text-2xl font-bold">₱4,084,775.00</h2>
//           </div>
//           {/*<div className="p-3 bg-green-50 rounded-full">
//             <DollarSign size={24} className="text-green-600" />
//           </div>*/}
//         </div>
//       </div>
//       <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-600">
//         <div className="flex justify-between items-center">
//           <div>
//             <p className="text-gray-500 text-sm">Active Suppliers</p>
//             <h2 className="text-2xl font-bold">12</h2>
//           </div>
//           {/*<div className="p-3 bg-purple-50 rounded-full">
//             <Users size={24} className="text-purple-600" />
//           </div>*/}
//         </div>
//       </div>
//     </div>
//   );
// };