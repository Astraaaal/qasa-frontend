// SLICED THE DATA INTO 4 CARDS and THE 4 CARD WILL ONLY DISPLAY 

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';
import { fetchDepartments } from "@/components/service/api/department";
import { useAuth } from "@/components/service/hooks/useAuth";

interface MetricCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  change?: {
    value: string;
    increase: boolean;
  };
  action?: {
    label: string;
    onClick: () => void;
  };
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  change,
  action,
}) => {
  return (
    <Card className="bg-white border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            {change && (
              <div className="flex items-center mt-1">
                {icon}
                <span
                  className={`text-sm ml-1 ${
                    change.increase ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {change.value}
                </span>
              </div>
            )}
          </div>
          {action && (
            <button
              onClick={action.onClick}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {action.label}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const MetricsSection: React.FC = () => {
  const [departmentMetrics, setDepartmentMetrics] = useState<MetricCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const loadDepartments = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const departments = await fetchDepartments(token);
        
        console.log("API Response:", departments);

        if (!departments || departments.length === 0) {
          setDepartmentMetrics([]);
          setLoading(false);
          return;
        }

        // Transform department data and take only first 4 departments
        const mappedMetrics = departments.slice(0, 4).map((dept: any) => {
          const budget = dept.mBudget || 0;
          const budgetChange = dept.mBudgetChange || 0;
          
          return {
            title: dept.mName || 'Department Budget',
            value: `₱${budget.toLocaleString()}`,
            icon: budgetChange >= 0 ? (
              <ArrowUp className="text-green-600" size={20} />
            ) : (
              <ArrowDown className="text-red-600" size={20} />
            ),
            change: {
              value: `${budgetChange >= 0 ? '+' : ''}${Math.abs(budgetChange)}%`,
              increase: budgetChange >= 0
            }
          };
        });

        // If we have less than 4 departments, fill with empty cards
        while (mappedMetrics.length < 4) {
          mappedMetrics.push({
            title: `Department ${mappedMetrics.length + 1}`,
            value: "₱0",
            icon: <ChevronDown className="text-amber-600" size={20} />,
            action: {
              label: "Add Budget",
              onClick: () => console.log("Add budget clicked")
            }
          });
        }

        setDepartmentMetrics(mappedMetrics);
      } catch (error) {
        console.error("Error fetching departments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDepartments();
  }, [token]);

  // Default metrics (always 4 cards)
  const defaultMetrics = [
    {
      title: "Total Sales",
      value: "₱0",
      icon: <ChevronDown className="text-amber-600" size={20} />,
      action: { label: "Add Data", onClick: () => console.log("Add sales data") }
    },
    {
      title: "Total Orders",
      value: "0",
      icon: <ChevronDown className="text-amber-600" size={20} />,
      action: { label: "Add Data", onClick: () => console.log("Add orders data") }
    },
    {
      title: "Average Value",
      value: "₱0",
      icon: <ChevronDown className="text-amber-600" size={20} />,
      action: { label: "Add Data", onClick: () => console.log("Add value data") }
    },
    {
      title: "Pending Actions",
      value: "0",
      icon: <ChevronDown className="text-amber-600" size={20} />,
      action: { label: "Review", onClick: () => console.log("Review actions") }
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="bg-white border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Loading...
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-10 animate-pulse bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const displayMetrics = departmentMetrics.length === 4 ? departmentMetrics : defaultMetrics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {displayMetrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
          change={metric.change}
          action={metric.action}
        />
      ))}
    </div>
  );
};

export default MetricsSection;








// FETCHING ALL THE API DATA

// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
// import { ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';
// import { fetchDepartments } from "@/components/service/api/department";
// import { useAuth } from "@/components/service/hooks/useAuth";

// interface MetricCardProps {
//   title: string;
//   value: string;
//   icon?: React.ReactNode;
//   change?: {
//     value: string;
//     increase: boolean;
//   };
//   action?: {
//     label: string;
//     onClick: () => void;
//   };
// }

// const MetricCard: React.FC<MetricCardProps> = ({
//   title,
//   value,
//   icon,
//   change,
//   action,
// }) => {
//   return (
//     <Card className="bg-white border shadow-sm">
//       <CardHeader className="pb-2">
//         <CardTitle className="text-sm font-medium text-gray-500">
//           {title}
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="flex justify-between items-end">
//           <div>
//             <div className="text-2xl font-bold">{value}</div>
//             {change && (
//               <div className="flex items-center mt-1">
//                 {icon}
//                 <span
//                   className={`text-sm ml-1 ${
//                     change.increase ? 'text-green-600' : 'text-red-600'
//                   }`}
//                 >
//                   {change.value}
//                 </span>
//               </div>
//             )}
//           </div>
//           {action && (
//             <button
//               onClick={action.onClick}
//               className="text-sm text-blue-600 hover:text-blue-800"
//             >
//               {action.label}
//             </button>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// const MetricsSection: React.FC = () => {
//   const [departmentMetrics, setDepartmentMetrics] = useState<MetricCardProps[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { token } = useAuth();

//   useEffect(() => {
//     const loadDepartments = async () => {
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         const departments = await fetchDepartments(token);
        
//         console.log("API Response:", departments); // Debugging log

//         if (!departments || departments.length === 0) {
//           setDepartmentMetrics([]);
//           setLoading(false);
//           return;
//         }

//         // Transform department data to match the metrics format
//         const mappedMetrics = departments.map((dept: any) => {
//           // Ensure we have proper values
//           const budget = dept.mBudget || 123;
//           const budgetChange = dept.mBudgetChange || 2;
        
          
//           return {
//             title: dept.mName || 'Department Budget',
//             value: `₱${budget.toLocaleString()}`,
//             icon: budgetChange >= 0 ? (
//               <ArrowUp className="text-green-600" size={20} />
//             ) : (
//               <ArrowDown className="text-red-600" size={20} />
//             ),
//             change: {
//               value: `${budgetChange >= 0 ? '+' : ''}${Math.abs(budgetChange)}%`,
//               increase: budgetChange >= 0
//             }
//           };
//         });

//         setDepartmentMetrics(mappedMetrics);
//       } catch (error) {
//         console.error("Error fetching departments:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDepartments();
//   }, [token]);

//   // Default metrics if no department data is available
//   const defaultMetrics = [
//     {
//       title: "Total Sales This Month",
//       value: "₱548,290",
//       icon: <ArrowUp className="text-green-600" size={20} />,
//       change: { value: "+12.5%", increase: true }
//     },
//     {
//       title: "Total Orders",
//       value: "1,248",
//       icon: <ArrowUp className="text-green-600" size={20} />,
//       change: { value: "+8.2%", increase: true }
//     },
//     {
//       title: "Average Order Value",
//       value: "₱439",
//       icon: <ArrowDown className="text-red-600" size={20} />,
//       change: { value: "-2.3%", increase: false }
//     },
//     {
//       title: "Pending Approvals",
//       value: "24",
//       icon: <ChevronDown className="text-amber-600" size={20} />,
//       action: { label: "Review Now", onClick: () => console.log("Review clicked") }
//     }
//   ];

//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//         {[1, 2, 3, 4].map((i) => (
//           <Card key={i} className="bg-white border shadow-sm">
//             <CardHeader className="pb-2">
//               <CardTitle className="text-sm font-medium text-gray-500">
//                 Loading...
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="h-10 animate-pulse bg-gray-200 rounded"></div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     );
//   }

//   const displayMetrics = departmentMetrics.length > 0 ? departmentMetrics : defaultMetrics;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//       {displayMetrics.map((metric, index) => (
//         <MetricCard
//           key={index}
//           title={metric.title}
//           value={metric.value}
//           icon={metric.icon}
//           change={metric.change}
//           action={metric.action}
//         />
//       ))}
//     </div>
//   );
// };

// export default MetricsSection;








//STATIC DATA
// import React from 'react';
// import Card from './CardSection';
// import { ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';

// const MetricsSection: React.FC = () => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//       <Card 
//         title="Total Sales This Month"
//         value="₱548,290"
//         icon={<ArrowUp className="text-green-600" size={20} />}
//         change={{ value: '+12.5%', increase: true }}
//       />
//       <Card 
//         title="Total Orders"
//         value="1,248"
//         icon={<ArrowUp className="text-green-600" size={20} />}
//         change={{ value: '+8.2%', increase: true }}
//       />
//       <Card 
//         title="Average Order Value"
//         value="₱439"
//         icon={<ArrowDown className="text-red-600" size={20} />}
//         change={{ value: '-2.3%', increase: false }}
//       />
//       <Card 
//         title="Pending Approvals"
//         value="24"
//         icon={<ChevronDown className="text-amber-600" size={20} />}
//         action={{ label: 'Review Now', onClick: () => console.log('Review clicked') }}
//       />
//     </div>
//   );
// };

// export default MetricsSection;